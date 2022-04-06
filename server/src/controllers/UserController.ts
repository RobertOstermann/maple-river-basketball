import * as Auth0 from "auth0";
import Express from "express";
import { QueryResult } from "pg";

import { PermissionLevels } from "../constants/PermissionLevels";
import database from "../database/database";
import User from "../models/User";
import AuthController from "./AuthController";

export default class UserController {
  static getUser = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;

    const { rows, rowCount } = await database.query(
      "SELECT * FROM users WHERE auth_id = $1 LIMIT 1",
      [authId]
    );

    if (rowCount === 1) {
      const user = rows[0];

      response.status(200).json({
        user: user
      });

      return;
    }

    if (rowCount === 0) {
      const userInformation: Auth0.User = await AuthController.getUserInformation(authId);
      const user: User = {
        authId: authId,
        permissionLevel: PermissionLevels.player.id,
        email: userInformation.email,
        firstName: userInformation.given_name ?? "First",
        lastName: userInformation.family_name ?? "Last",
      };

      await database.query(
        "INSERT INTO users (auth_id, permission_level, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)",
        [authId, user.permissionLevel, user.email, user.firstName, user.lastName]
      );

      response.status(200).json({
        user: user
      });
    }
  };

  static getUsers = async (request: any, response: any) => {
    const authId = request.user.sub;

    const { rows } = await database.query(
      "SELECT * FROM users WHERE auth_id = $1 AND permission_level = $2 LIMIT 1",
      [authId, PermissionLevels.coach.id]
    );


    await database.query("SELECT * FROM users ORDER BY id ASC", (error: Error, results: QueryResult) => {
      if (error) throw error;

      response.status(200).json(results.rows);
    });
  };

  static updateUser = async (request: any, response: any) => {
    const authId = request.user.sub;
    const user: User = request.body;

    database.query(
      "UPDATE users SET first_name = $1, last_name = $2 WHERE auth_id = $3",
      [user.firstName, user.lastName, authId],
      (error: Error) => {
        if (error) throw error;

        response.status(200).json({
          message: "User Updated"
        });
      });
  };
}
