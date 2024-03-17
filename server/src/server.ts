/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from "express";
import path from "path";

import "dotenv/config";

import AuthController from "./controllers/AuthController";
import DownloadController from "./controllers/DownloadController";
import EntryController from "./controllers/EntryContoller";
import UserController from "./controllers/UserController";

console.log("Initializing Server");

const PORT = process.env.PORT || 3001;
const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

// Read the body of a json object.
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Node serves the frontend files.
if (process.env.NODE_ENV === "production") {
  console.log("Serving static files.");
  app.use(express.static(path.resolve(__dirname, "../../client/build")));
}

console.log("Setting up routes.");

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

// Downloads
app.get("/api/v1/download-player-stats", AuthController.jwtCheck, DownloadController.downloadPlayerStats);

// Coach - Users
app.get("/api/v1/get-all-players", AuthController.jwtCheck, UserController.getAllPlayers);

// Coach - Entries
app.get("/api/v1/get-all-entries", AuthController.jwtCheck, EntryController.getAllEntries);

// Player - Users
app.get("/api/v1/get-user", AuthController.jwtCheck, UserController.getUser);
app.get("/api/v1/get-user/:id", AuthController.jwtCheck, UserController.getUserById);
app.put("/api/v1/update-user", AuthController.jwtCheck, UserController.updateUser);

// Player - Entries
app.get("/api/v1/get-user-entries", AuthController.jwtCheck, EntryController.getUserEntries);
app.post("/api/v1/create-entry", AuthController.jwtCheck, EntryController.createEntry);

// This handles react routing for non-api requests.
if (process.env.NODE_ENV === "production") {
  console.log("Setting up react routing.");
  app.get("/*", (request, response) => {
    console.log("Retrieving react file.");
    response.sendFile(path.resolve(__dirname, "../../client/build/index.html"), (error) => {
      if (error) {
        response.status(500).send(error);
      }
    });
  });
}

if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}`
    );
  });
} else {
  app.listen(PORT, () => {
    console.log(
      `Server is running at https://localhost:${PORT}`
    );
  });
}
