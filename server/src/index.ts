/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";

import express, { Request, Response } from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import path from "path";

import UserController from "./controllers/UserController";

const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

const audience = process.env.AUTH0_AUDIENCE ?? "No Audience";
const domain = process.env.AUTH0_DOMAIN ?? "No Domain";

app.use(cors());
app.options("*", cors());

// Read the body of a json object.
app.use(express.json());
app.use(express.urlencoded());

// Node serves the frontend files.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set.
const jwtCheck = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

// This route doesn't need authentication.
app.get("/api/v1/public", (req: any, res: Response) => {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication.
app.get(
  "/api/v1/private",
  jwtCheck,
  (req: any, res: Response) => {
    res.json({
      message:
        `Hello from a private endpoint! You need to be authenticated to see this.\n${JSON.stringify(req.user)}`,
    });
  });

// This route needs authentication with a scope of coach.
app.get(
  "/api/v1/private-scoped",
  jwtCheck,
  (req: Request, res: Response) => {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// Users
app.get("/api/v1/user", jwtCheck, UserController.getUser);

app.get("/api/v1/users", UserController.getUsers);
app.get("/api/v1/users/:id", UserController.getUserById);
app.put("/api/v1/users/:id", UserController.updateUser);

app.use(jwtCheck);
app.listen(PORT, () => {
  console.log(
    `Server is running at https://localhost:${PORT}\n${audience}\n${domain}`
  );
});
