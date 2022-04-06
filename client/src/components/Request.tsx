import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";

import { ActivityTypes } from "../shared/constants/ActivityTypes";
import Entry from "../shared/models/Entry";

const Request = () => {
  const [data, setData] = useState<any>([]);
  const [entry, setEntry] = useState<Entry>({
    activityType: ActivityTypes.game.id,
    activityDuration: 15,
  });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getUserApi();
  }, []);

  const updateActivity = (value: number) => {
    const updatedEntry = entry;
    updatedEntry.activityType = value;
    setEntry(updatedEntry);
  };

  const updateDate = (updatedDate: Date) => {
    const updatedEntry = entry;
    updatedEntry.activityDate = updatedDate;
    setEntry(updatedEntry);
  };

  const updateDuration = (updatedDuration: number) => {
    const updatedEntry = entry;
    updatedEntry.activityDuration = updatedDuration;
    setEntry(updatedEntry);
  };

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

      if (
        entry.activityType !== undefined &&
        entry.activityDate !== undefined &&
        entry.activityDuration !== undefined
      ) {
        const response = await axios.post(`${api}/create-entry`, entry, config);
        const responseData = await response.data;

        setData(responseData.message);
      } else {
        setData(["Complete All Selections"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <br />
      <Card>
        <Card.Body>{data}</Card.Body>
      </Card>
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
      <button onClick={() => updateUserApi()}>Update User Api</button>
      <br />
      <br />
      <button onClick={() => getEntriesApi()}>Get Entries Api</button>
      <br />
      <br />
      <FloatingLabel controlId="floatingSelect" label="Activity">
        <Form.Select
          onChange={(event) => updateActivity(parseInt(event.target.value))}
        >
          {/* TODO: Map ActivityTypes */}
          <option value={0}>Game</option>
          <option value={1}>Shooting</option>
          <option value={2}>Skills (Camp, Ball Handling, Drills, etc.)</option>
          <option value={3}>Community Service</option>
          <option value={4}>Weight Room</option>
        </Form.Select>
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingDate" label="Date">
        <Form.Control
          type="date"
          name="Date"
          onChange={(event) => updateDate(new Date(event.target.value))}
        />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingSelect" label="Duration">
        <Form.Select
          onChange={(event) => updateDuration(parseInt(event.target.value))}
        >
          <option value={15}>15 Minutes</option>
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>1 Hour</option>
          <option value={75}>1 Hour 15 Minutes</option>
          <option value={90}>1 Hour 30 Minutes</option>
          <option value={105}>1 Hour 45 Minutes</option>
          <option value={120}>2 Hours</option>
          <option value={135}>2 Hours 15 Minutes</option>
          <option value={150}>2 Hours 30 Minutes</option>
          <option value={165}>2 Hours 45 Minutes</option>
          <option value={180}>3 Hours</option>
        </Form.Select>
      </FloatingLabel>
      <br />
      <button onClick={() => createEntryApi()}>Create Entry Api</button>
      <br />
      <br />
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>{JSON.stringify(entry)}</Card.Body>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default Request;
