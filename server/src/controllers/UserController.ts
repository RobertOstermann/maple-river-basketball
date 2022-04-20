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
        id: 0,
        authId: authId,
        permissionLevel: PermissionLevels.player.id,
        email: userInformation.email,
        firstName: userInformation.given_name ?? "First",
        lastName: userInformation.family_name ?? "Last",
        graduationYear: 0
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
    const authId = request.user.sub;
    const userId = request.params.id;
    const permissionLevel = await this.getPermissionLevel(authId);

    try {
      if (permissionLevel !== undefined && permissionLevel === PermissionLevels.coach.id) {
        const query = {
          name: "fetch-user-by-id",
          text: "SELECT * FROM users WHERE id = $1",
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
    const authId = request.user.sub;
    const permissionLevel = await this.getPermissionLevel(authId);
    let users: User[] = [];

    try {
      const query = {
        name: "fetch-all-players",
        text: "SELECT * FROM users WHERE permission_level = $1 ORDER BY graduation_year DESC, last_name ASC, first_name ASC, id ASC",
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
    const authId = request.user.sub;
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

    if (graduationYear !== 0 && (graduationYear < 2022 || graduationYear > 2026)) {
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
