/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryResult } from "pg";

import database from "../database/database";
import User from "../models/User";

export default class UserController {
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

  static createUser = (request: any, response: any) => {
    const { firstName, email } = request.body;
    const user: User = {
      firstName: firstName,
      email: email
    };

    database.query(
      "INSERT INTO users (firstName, email) VALUES ($1, $2)",
      [user.firstName, user.email],
      (error: Error, results: QueryResult) => {
        if (error) throw error;

        response.status(201).send("User added with ID: {result.insertId}");
      });
  };

  static updateUser = (request: any, response: any) => {
    const { firstName, email } = request.body;
    const user: User = {
      id: parseInt(request.params.id),
      firstName: firstName,
      email: email
    };

    database.query(
      "UPDATE users SET first_name = $1, email = $2 WHERE id = $3",
      [user.firstName, user.email, user.id],
      (error: Error, results: QueryResult) => {
        if (error) throw error;

        response.status(200).send(`User modified with ID: ${user.id}`);
      });
  };

  static deleteUser = (request: any, response: any) => {
    const user: User = {
      id: parseInt(request.params.id)
    };

    database.query(
      "DELETE FROM users WHERE id = $1",
      [user.id],
      (error: Error, results: QueryResult) => {
        if (error) throw error;

        response.status(200).send(`User deleted with ID: ${user.id}`);
      });
  };
}
