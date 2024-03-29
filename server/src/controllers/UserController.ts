import * as Auth0 from "auth0";
import camelcaseKeys from "camelcase-keys";
import Express from "express";

import { PermissionLevels } from "../constants/PermissionLevels";
import database from "../database/database";
import Entry from "../models/Entry";
import User from "../models/User";
import AuthController from "./AuthController";
import EntryController from "./EntryContoller";

export default class UserController {
  static getPermissionLevel = async (authId: string): Promise<number> => {
    try {
      const result = await database.query(
        "SELECT * FROM users WHERE auth_id = $1 AND permission_level = $2 LIMIT 1",
        [authId, PermissionLevels.coach.id]
      );
      const user: User = camelcaseKeys(result.rows[0]);

      return user.permissionLevel ? user.permissionLevel : PermissionLevels.player.id;
    } catch (error) {
      console.log(error);
      return PermissionLevels.player.id;
    }
  };

  static getUser = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request?.auth?.sub;
    if (!authId) return;

    const { rows, rowCount } = await database.query(
      "SELECT * FROM users WHERE auth_id = $1 LIMIT 1",
      [authId]
    );

    if (rowCount === 1) {
      const user = rows[0];
      if (user.id && user.active === false) {
        const query = {
          name: "fetch-user-by-id",
          text: "UPDATE users SET active = TRUE WHERE id = $1",
          values: [user.id]
        };

        database.query(query);
      }

      response.status(200).json({
        user: user
      });

      return;
    }

    if (rowCount === 0) {
      const userInformation: Auth0.User = await AuthController.getUserInformation(authId);
      const user: User = {
        id: 0,
        authId: authId,
        permissionLevel: PermissionLevels.player.id,
        email: userInformation.email,
        firstName: userInformation.given_name ?? "First",
        lastName: userInformation.family_name ?? "Last",
        graduationYear: 0,
        active: true,
      };

      database.query(
        "INSERT INTO users (auth_id, permission_level, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)",
        [authId, user.permissionLevel, user.email, user.firstName, user.lastName]
      ).then(() => {
        response.status(200).json({
          user: user
        });
      }).catch((error) => {
        response.status(400).json(error);
      });
    }
  };

  static getUserById = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request?.auth?.sub;
    if (!authId) return;
    const userId = request.params.id;
    const permissionLevel = await this.getPermissionLevel(authId);

    try {
      if (permissionLevel !== undefined && permissionLevel === PermissionLevels.coach.id) {
        const query = {
          name: "fetch-user-by-id",
          text: "SELECT * FROM users WHERE id = $1 AND active = true",
          values: [userId]
        };
        const results = await database.query(query);
        const user: User = camelcaseKeys(results.rows[0], { deep: true });
        const entries: Entry[] = await EntryController.getAllEntriesByUser(user.authId);
        user.entries = entries;

        response.status(200).json({
          user: user
        });
      } else {
        response.status(401).json("Invalid Permission Level");
      }
    } catch (error) {
      response.status(400).json(error);
    }

    return;
  };

  static getAllPlayers = async (request: any, response: any) => {
    let users: User[] = [];

    try {
      const sql = /*sql*/ `
        SELECT *
        FROM users
        WHERE permission_level = $1
          AND active = true
        ORDER BY
          CASE WHEN graduation_year = 0 THEN 1 ELSE 0 END ASC,
          graduation_year ASC,
          last_name ASC,
          first_name ASC,
          id ASC
      `;
      const query = {
        name: "fetch-all-players",
        text: sql,
        values: [PermissionLevels.player.id]
      };
      const results = await database.query(query);
      users = camelcaseKeys(results.rows, { deep: true });

      for await (const user of users) {
        const entries: Entry[] = await EntryController.getAllEntriesByUser(user.authId);
        user.entries = entries;
      }

      response.status(200).json({
        users: users
      });
    } catch (error) {
      response.status(400).json(error);
    }
  };

  static updateUser = async (request: any, response: any) => {
    const authId = request?.auth?.sub;
    if (!authId) return;
    const user: User = request.body;
    const { firstName, lastName, graduationYear } = user;
    if (!firstName) {
      response.status(400).json("Invalid First Name");
      return;
    }

    if (!lastName) {
      response.status(400).json("Invalid Last Name");
      return;
    }

    const currentYear = (new Date()).getFullYear();
    if (graduationYear && graduationYear !== 0 && (graduationYear < currentYear - 1 || graduationYear > currentYear + 10)) {
      response.status(400).json("Invalid Graduation Year");
      return;
    }

    database.query(
      "UPDATE users SET first_name = $1, last_name = $2, graduation_year = $3 WHERE auth_id = $4",
      [firstName, lastName, graduationYear, authId])
      .then(() => {
        response.status(200).json("User Updated");
      })
      .catch((error) => {
        response.status(400).json(error);
      });
  };
}
