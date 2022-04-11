import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import EntryModel from "../../../../shared/models/EntryModel";
import EntryRequests from "../../../shared/EntryRequests";

import styles from "./PlayerHome.module.scss";

export default function PlayerHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<EntryModel[]>([]);
  const [totals, setTotals] = useState<any[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const entries: EntryModel[] = await EntryRequests.getEntries(token);
      const updatedTotals: any[] = [];

      Object.values(ActivityTypes).map(
        (activityType: ActivityTypeInterface) => {
          updatedTotals[activityType.id] = 0;
        }
      );

      entries.map((entry) => {
        if (entry.activityType !== undefined) {
          if (updatedTotals[entry.activityType]) {
            updatedTotals[entry.activityType] += entry.activityDuration;
          } else {
            updatedTotals[entry.activityType] = entry.activityDuration;
          }
        }
      });

      setEntries(entries);
      setTotals(updatedTotals);
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
    return totals.map((duration, activityType) => {
      return (
        <Card
          key={activityType}
          className={styles.entryCard}
          bg="primary-dark"
          border="primary-light"
          text="secondary"
        >
          <Card.Body>
            <Row>
              <Col>Activity</Col>
              <Col>{getActivityType(activityType ?? 0)}</Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Total Duration</Col>
              <Col>{getDurationString(duration ?? 0)}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <Container fluid>
      <div className={styles.entryDiv}>{entryCards()}</div>
    </Container>
  );
}
