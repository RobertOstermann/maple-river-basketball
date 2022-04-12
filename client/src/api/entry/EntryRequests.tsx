import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import Helper from "../Helper";
import EntryModel from "./EntryModel";

export default class EntryRequests {
  static getEntries = async (token: string): Promise<EntryModel[]> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${Helper.getApiRoute()}/get-user-entries`,
        config
      );

      const entries: EntryModel[] = camelcaseKeys(response.data.entries, {
        deep: true,
      });

      return entries;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get the user");
    }
  };

  static createEntry = async (
    token: string,
    entry: EntryModel
  ): Promise<void> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${Helper.getApiRoute()}/create-entry`, entry, config);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create the entry");
    }
  };
}
