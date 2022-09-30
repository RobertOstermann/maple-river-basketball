import Express from "express";
import { Parser } from "json2csv";

import { PermissionLevels } from "../constants/PermissionLevels";
import database from "../database/database";
import UserController from "./UserController";

export default class DownloadController {
  static downloadResource = (response: Express.Response, fileName: string, fields: any, data: JSON) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    response.header("Content-Type", "text/csv");
    response.attachment(fileName);
    return response.status(200).send(csv);
  };

  static downloadPlayerStats = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request.user.sub;
    const permissionLevel = await UserController.getPermissionLevel(authId);

    try {
      if ((permissionLevel !== undefined && permissionLevel === PermissionLevels.coach.id)) {
        const sql = /*sql*/ `
          SELECT id, first_name
          FROM users;
        `;
        const query = {
          name: "download-player-stats",
          text: sql,
        };
        const results = await database.query(query);

        const fields = [
          {
            label: "id",
            value: "id",
          },
          {
            label: "First Name",
            value: "first_name"
          }
        ];

        return DownloadController.downloadResource(
          response,
          "player-stats.csv",
          fields,
          JSON.parse(JSON.stringify(results.rows))
        );
      } else {
        response.status(401).json("Invalid Permission Level");
      }
    } catch (error) {
      response.status(400).json(error);
    }

    return;
  };
}
