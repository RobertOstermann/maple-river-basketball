import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import EntryModel from "../../../../shared/models/EntryModel";
import EntryRequests from "../../../shared/EntryRequests";

import styles from "./History.module.scss";

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<EntryModel[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log("Get entries");
    getEntries();
  }, []);

  const getEntries = async (): Promise<void> => {
    try {
      const token = await getAccessTokenSilently();
      const entries: EntryModel[] = await EntryRequests.getEntries(token);

      setEntries(entries);
    } catch (error) {
      console.log(error);
      setEntries([]);
    }
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
        <Card key={index} className="mb-3" bg="dark" text="secondary">
          <Card.Body>
            <Row>
              <Col>Date</Col>
              <Col>
                {new Date(entry.activityDate ?? Date.now())
                  .toISOString()
                  .slice(0, 10)}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>Activity</Col>
              <Col>{getActivityType(entry.activityType ?? 0)}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Duration</Col>
              <Col>{getDurationString(entry.activityDuration ?? 0)}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  };

  const refreshButton = () => {
    return (
      <Navbar
        fixed="bottom"
        id="navbar"
        role="navigation"
        variant="dark"
        className={styles.refreshDiv}
      >
        <Nav justify className="w-100">
          <Button
            variant="primary"
            size="lg"
            onClick={isLoading ? undefined : () => getEntries()}
            className={styles.refreshButton}
          >
            {isLoading ? "Refreshing..." : "Refresh Entries"}
          </Button>
        </Nav>
      </Navbar>
    );
  };

  return (
    <Container fluid>
      <div className={styles.entryDiv}>{entryCards()}</div>
      {refreshButton()}
    </Container>
  );
}
