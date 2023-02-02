import Express from "express";
import { Parser } from "json2csv";

import { PermissionLevels } from "../constants/PermissionLevels";
import database from "../database/database";
import UserController from "./UserController";

export default class DownloadController {
  static downloadResource = (response: Express.Response, fileName: string, fields: any, data: JSON) => {
    const json2csv = fields ? new Parser({ fields }) : new Parser();
    const csv = json2csv.parse(data);
    response.header("Content-Type", "text/csv");
    response.attachment(fileName);
    return response.status(200).send(csv);
  };

  static downloadPlayerStats = async (request: Express.Request | any, response: Express.Response) => {
    const authId = request?.user?.sub;
    if (!authId) return;

    const permissionLevel = await UserController.getPermissionLevel(authId);

    try {
      if ((permissionLevel !== undefined && permissionLevel === PermissionLevels.coach.id)) {
        const sql = /*sql*/ `
        SELECT
          CONCAT(users.first_name, ' ', users.last_name) AS "Name",
          activity_types.activity_text AS "Entry Type",
          TO_CHAR(entries.activity_date, 'mm/dd/yyyy') AS "Entry Date",
          entries.activity_duration AS "Entry Duration (min)"
        FROM users
          LEFT JOIN entries ON entries.auth_id = users.auth_id
          INNER JOIN activity_types ON activity_types.activity_id = entries.activity_type
        WHERE users.permission_level = 2;
        `;
        const query = {
          name: "download-player-stats",
          text: sql,
        };
        const results = await database.query(query);

        return DownloadController.downloadResource(
          response,
          "player-stats.csv",
          undefined,
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
