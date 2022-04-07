import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import User from "../../shared/models/User";
import Helper from "./Helper";

export default class UserRequests {
  static getUser = async (token: string): Promise<User> => {
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
      const user: User = camelcaseKeys(response.data.user);

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("GetUser Failed");
    }
  };
}
