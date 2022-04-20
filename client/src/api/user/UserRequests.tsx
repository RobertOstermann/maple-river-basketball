import axios from "axios";
import camelcaseKeys from "camelcase-keys";

import Helper from "../Helper";
import UserModel from "./UserModel";

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

      const user: UserModel = camelcaseKeys(response.data.user, { deep: true });

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get the user");
    }
  };

  static getUserById = async (
    id: number,
    token: string
  ): Promise<UserModel> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${Helper.getApiRoute()}/get-user/${id}`,
        config
      );

      const user: UserModel = camelcaseKeys(response.data.user, { deep: true });

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

  static getAllPlayers = async (token: string): Promise<UserModel[]> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${Helper.getApiRoute()}/get-all-players`,
        config
      );

      const users: UserModel[] = camelcaseKeys(response.data.users, {
        deep: true,
      });

      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get the user");
    }
  };
}
