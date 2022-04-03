import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

import Entry from "../../../server/src/models/Entry";
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
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${api}/private`, config);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${api}/get-user`, config);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        firstName: "First",
        lastName: "Last",
      };

      const response = await axios.put(`${api}/update-user`, data, config);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntriesApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${api}/get-user-entries`, config);
      const responseData = await response.data;

      setData(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const createEntryApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data: Entry = {
        activity: "Game",
        activityDate: new Date("2022-04-03"),
        activityDuration: 30,
      };

      const response = await axios.post(`${api}/create-entry`, data, config);
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
      <button onClick={() => getUserApi()}>Get User Api</button>
      <br />
      <br />
      <button onClick={() => getEntriesApi()}>Get Entries Api</button>
      <br />
      <br />
      <button onClick={() => createEntryApi()}>Create Entry Api</button>
      <br />
      <br />
    </div>
  );
};

export default Request;
