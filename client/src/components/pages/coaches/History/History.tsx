import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import EntryRequests from "../../../../api/entry/EntryRequests";
import UserEntryModel from "../../../../api/entry/UserEntryModel";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import Loading from "../../shared/Loading/Loading";

import styles from "./History.module.scss";

export function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<UserEntryModel[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllEntries();
  }, []);

  const getAllEntries = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const entries: UserEntryModel[] = await EntryRequests.getAllEntries(
        token
      );
      setEntries(entries);
    } catch (error) {
      console.log(error);
      setEntries([]);
    }
    setIsLoading(false);
  };

  const getActivityType = (id: number) => {
    let ui = "";
    Object.values(ActivityTypes).map((activityType: ActivityTypeInterface) => {
      if (id === activityType.id) {
        ui = activityType.ui;
      }
    });

    return ui;
  };

  const getDurationString = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const hoursString =
      hours > 0 ? (hours === 1 ? `${hours} Hour ` : `${hours} Hours `) : "";
    const minutes = duration % 60;
    const minutesString = `${minutes} minutes`;

    return `${hoursString}${minutesString}`;
  };

  const entryCards = () => {
    return entries.map((entry, index) => {
      return (
        <Card
          key={index}
          className={styles.entryCard}
          bg="primary-dark"
          border="primary-light"
          text="secondary"
        >
          <Card.Body>
            <Row>
              <Col>Player</Col>
              <Col>{`${entry.firstName} ${entry.lastName}`}</Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Date</Col>
              <Col>
                {new Date(entry.activityDate ?? Date.now())
                  .toISOString()
                  .slice(0, 10)}
              </Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Activity</Col>
              <Col>{getActivityType(entry.activityType ?? 0)}</Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Duration</Col>
              <Col>{getDurationString(entry.activityDuration ?? 0)}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <div className={styles.entryDiv}>{entryCards()}</div>
    </Container>
  );
}