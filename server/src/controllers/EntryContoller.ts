import Express from "express";

import database from "../database/database";
import Entry from "../models/Entry";

export default class EntryController {
  static getUserEntries = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;
    const results = await database.query(
      "SELECT * FROM entries WHERE auth_id = $1",
      [authId]
    );

    const entries: Entry[] = results.rows;

    response.status(200).json({
      message: JSON.stringify(entries)
    });
  };

  static createEntry = async (request: any, response: any) => {
    const authId = request.user.sub;
    const entry: Entry = request.body;

    database.query(
      "INSERT INTO entries (auth_id, activity, activity_date, activity_duration) VALUES ($1, $2, $3, $4)",
      [authId, entry.activity, entry.activityDate, entry.activityDuration],
      (error: Error) => {
        if (error) throw error;

        response.status(200).json({
          message: JSON.stringify(entry)
        });
      });
  };

  static updateEntry = async (request: any, response: any) => {
    const authId = request.user.sub;
    const entry: Entry = request.body;

    database.query(
      "UPDATE entries SET activity = $1, activity_date = $2, activity_duration = $3 WHERE id = $4 AND auth_id = $5",
      [entry.activity, entry.activityDate, entry.activityDuration, entry.id, authId],
      (error: Error) => {
        if (error) throw error;

        response.status(200).json({
          message: "Entry Updated"
        });
      });
  };
}
