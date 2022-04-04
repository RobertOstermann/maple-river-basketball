/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";

import express, { Request, Response } from "express";
import path from "path";

import AuthController from "./controllers/AuthController";
import EntryController from "./controllers/EntryContoller";
import UserController from "./controllers/UserController";

const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.options("*", cors());

// Read the body of a json object.
app.use(express.json());
app.use(express.urlencoded());

// Node serves the frontend files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

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
  AuthController.jwtCheck,
  (req: any, res: Response) => {
    res.json({
      message:
        `Hello from a private endpoint! You need to be authenticated to see this.\n${JSON.stringify(req.user)}`,
    });
  });

// This route needs authentication with a scope of coach.
app.get(
  "/api/v1/private-scoped",
  AuthController.jwtCheck,
  (req: Request, res: Response) => {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// Users
app.get("/api/v1/get-user", AuthController.jwtCheck, UserController.getUser);
app.get("/api/v1/coach/get-users", AuthController.jwtCheck, UserController.getUsers);
app.put("/api/v1/update-user", AuthController.jwtCheck, UserController.updateUser);

// Entries
app.get("/api/v1/get-user-entries", AuthController.jwtCheck, EntryController.getUserEntries);
app.post("/api/v1/create-entry", AuthController.jwtCheck, EntryController.createEntry);

app.use(AuthController.jwtCheck);
app.listen(PORT, () => {
  console.log(
    `Server is running at https://localhost:${PORT}`
  );
});
