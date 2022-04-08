import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import UserModel from "../../shared/models/UserModel";
import Helper from "./Helper";

export default class UserRequests {
  static getUser = async (token: string): Promise<UserModel> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${Helper.getApiRoute()}/get-user`,
        config
      );

      const user: UserModel = camelcaseKeys(response.data.user);

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get the user");
    }
  };

  static updateUser = async (token: string, user: UserModel): Promise<void> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${Helper.getApiRoute()}/update-user`, user, config);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update the user");
    }
  };
}
