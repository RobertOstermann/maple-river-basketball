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

  static getAllUsers = async (request: any, response: any) => {
    const authId = request.user.sub;
    const permissionLevel = await this.getPermissionLevel(authId);
    let users: User[] = [];
    if (permissionLevel !== undefined && permissionLevel === PermissionLevels.coach.id) {
      const results = await database.query("SELECT * FROM users ORDER BY id ASC");
      users = camelcaseKeys(results.rows, { deep: true });
      for await (const user of users) {
        const entries: Entry[] = await EntryController.getAllEntriesByUser(authId, user.authId);
        user.entries = entries;
      }

      response.status(200).json({
        users: users
      });
    } else {
      response.status(401).json("Invalid Permission Level");
    }
  };

  static updateUser = async (request: any, response: any) => {
    const authId = request.user.sub;
    const user: User = request.body;

    database.query(
      "UPDATE users SET first_name = $1, last_name = $2 WHERE auth_id = $3",
      [user.firstName, user.lastName, authId])
      .then(() => {
        response.status(200).json("User Updated");
      })
      .catch((error) => {
        response.status(400).json(error);
      });
  };
}
