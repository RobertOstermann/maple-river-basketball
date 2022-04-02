import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

import Profile from "./Profile";

const Request = () => {
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  let api = "http://localhost:3001/api/v1";
  if (process.env.NODE_ENV === "production") {
    api = `${window.location.origin}/api/v1`;
  }

  const callApi = async () => {
    try {
      const response = await axios.get(`${api}/public`);

      console.log(response);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.get(`${api}/private`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const callPermissionApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.get(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <br />
      <h3>{data}</h3>
      <br />
      <button onClick={() => setData([])}>Remove Data</button>
      <br />
      <br />
      <button onClick={() => callApi()}>Public Api</button>
      <br />
      <br />
      <button onClick={() => callSecureApi()}>Private Api</button>
      <br />
      <br />
      <button onClick={() => callPermissionApi()}>User Permission Api</button>
      <br />
      <br />
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default Request;
