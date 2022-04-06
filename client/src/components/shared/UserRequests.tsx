import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import User from "../../shared/models/User";

const { getAccessTokenSilently } = useAuth0();

let api = "http://localhost:3001/api/v1";
if (process.env.NODE_ENV === "production") {
  api = `${window.location.origin}/api/v1`;
}

export const GetUser = async (): Promise<User> => {
  try {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${api}/get-user`, config);
    const user: User = response.data.user;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("GetUser Failed");
  }
};
