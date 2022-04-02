import Express from "express";
import { QueryResult } from "pg";

import database from "../database/database";
import User from "../models/User";

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
      await database.query(
        "INSERT INTO users (auth_id) VALUES ($1)",
        [authId]
      );

      user.authId = authId;
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

  static getUserById = (request: any, response: any) => {
    const user = {
      id: parseInt(request.params.id)
    };

    database.query(
      "SELECT * FROM users WHERE id = $1",
      [user.id],
      (error: Error, results: QueryResult) => {
        if (error) throw error;

        response.status(200).json(results.rows);
      }
    );
  };

  static updateUser = (request: any, response: any) => {
    const { firstName } = request.body;
    const user: User = {
      id: parseInt(request.params.id),
      firstName: firstName,
    };

    database.query(
      "UPDATE users SET first_name = $1 WHERE id = $2",
      [user.firstName, user.id],
      (error: Error) => {
        if (error) throw error;

        response.status(200).send(`User modified with ID: ${user.id}`);
      });
  };
}
