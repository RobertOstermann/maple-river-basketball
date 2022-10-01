import camelcaseKeys from "camelcase-keys";
import Express from "express";

import { PermissionLevels } from "../constants/PermissionLevels";
import database from "../database/database";
import Entry from "../models/Entry";
import UserEntry from "../models/UserEntry";
import UserController from "./UserController";

export default class EntryController {
  static createEntry = async (request: any, response: any) => {
    const authId = request.user.sub;
    const entry: Entry = request.body;

    database.query(
      "INSERT INTO entries (auth_id, activity_type, activity_date, activity_duration) VALUES ($1, $2, $3, $4)",
      [authId, entry.activityType, entry.activityDate, entry.activityDuration])
      .then(() => {
        response.status(200).json("Entry Created");
      })
      .catch((error) => {
        response.status(400).json(error);
      });
  };

  static getAllEntries = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;
    const permissionLevel = await UserController.getPermissionLevel(authId);

    if (permissionLevel === PermissionLevels.coach.id) {
      const sql = /*sql*/ `
        SELECT users.first_name, users.last_name, entries.*
        FROM entries LEFT JOIN users ON users.auth_id = entries.auth_id
        WHERE users.permission_level = $1
        ORDER BY entries.activity_date DESC, entries.activity_duration DESC, entries.auth_id ASC
      `;
      const query = {
        name: "fetch-all-entries",
        text: sql,
        values: [PermissionLevels.player.id]
      };

      database.query(query)
        .then((results) => {
          const entries: UserEntry[] = results.rows;
          response.status(200).json({
            entries: entries
          });
        }).catch((error) => {
          response.status(400).json(error);
        });
    } else {
      response.status(401).json("Invalid Permission Level");
    }
  };

  static getAllEntriesByUser = async (authId: string): Promise<Entry[]> => {
    const results = await database.query(
      "SELECT * FROM entries WHERE auth_id = $1 ORDER BY activity_date DESC, activity_duration DESC",
      [authId]
    );
    const entries: Entry[] = camelcaseKeys(results.rows, { deep: true });
    return entries;
  };

  static getUserEntries = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;
    const results = await database.query(
      "SELECT * FROM entries WHERE auth_id = $1 ORDER BY activity_date DESC, activity_duration DESC",
      [authId]
    );

    const entries: Entry[] = results.rows;

    response.status(200).json({
      entries: entries
    });
  };

  static updateEntry = async (request: any, response: any) => {
    const authId = request.user.sub;
    const entry: Entry = request.body;

    database.query(
      "UPDATE entries SET activity_type = $1, activity_date = $2, activity_duration = $3 WHERE id = $4 AND auth_id = $5",
      [entry.activityType, entry.activityDate, entry.activityDuration, entry.id, authId],
      (error: Error) => {
        if (error) throw error;

        response.status(200).json({
          message: "Entry Updated"
        });
      });
  };
}
