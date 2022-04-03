import * as Auth0 from "auth0";
import Express from "express";
import { QueryResult } from "pg";

import database from "../database/database";
import User from "../models/User";
import AuthController from "./AuthController";

export default class UserController {
  static getUser = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;
    let user: User = {};


    const { rows, rowCount } = await database.query(
      "SELECT * FROM users WHERE auth_id = $1",
      [authId]
    );

    if (rowCount === 1) {
      user = rows[0];

      response.status(200).json({
        message: JSON.stringify(user)
      });

      return;
    }

    if (rowCount === 0) {
      const userInformation: Auth0.User = await AuthController.getUserInformation(authId);
      const email = userInformation.email;
      const permission = "player";

      await database.query(
        "INSERT INTO users (auth_id, email, permission) VALUES ($1, $2, $3)",
        [authId, email, permission]
      );

      user.permission = permission;
      response.status(200).json({
        message: JSON.stringify(user)
      });
    }
  };

  static getUsers = (request: any, response: any) => {
    database.query("SELECT * FROM users ORDER BY id ASC", (error: Error, results: QueryResult) => {
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
