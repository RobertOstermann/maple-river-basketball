import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import EntryModel from "../../../../../api/entry/EntryModel";
import EntryRequests from "../../../../../api/entry/EntryRequests";
import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../../shared/constants/ActivityTypes";
import Loading from "../../../shared/Loading/Loading";

import styles from "./Player.module.scss";

export default function Player() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserModel | undefined>();
  const [totals, setTotals] = useState<any[]>([]);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUserById(parseInt(id));
    }
  }, []);

  const getUserById = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const user: UserModel = await UserRequests.getUserById(id, token);
      const entries: EntryModel[] = user.entries ? user.entries : [];
      const updatedTotals: any[] = [];
      let totalDuration = 0;

      Object.values(ActivityTypes).map(
        (activityType: ActivityTypeInterface) => {
          updatedTotals[activityType.id] = 0;
        }
      );

      entries.map((entry) => {
        if (entry.activityType !== undefined) {
          totalDuration += entry.activityDuration ? entry.activityDuration : 0;
          if (updatedTotals[entry.activityType]) {
            updatedTotals[entry.activityType] += entry.activityDuration;
          } else {
            updatedTotals[entry.activityType] = entry.activityDuration;
          }
        }
      });

      setUser(user);
      setTotals(updatedTotals);
      setTotalDuration(totalDuration);
    } catch (error) {
      console.log(error);
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

  const categoryCards = () => {
    return totals.map((duration, activityType) => {
      return (
        <Card
          key={activityType}
          className={styles.categoryCard}
          bg="primary-dark"
          border="primary-light"
          text="secondary"
        >
          <Card.Body>
            <Row>
              <Col>Activity</Col>
              <Col>{getActivityType(activityType ?? 0)}</Col>
            </Row>
            <hr className={styles.categoryHR} />
            <Row>
              <Col>Total Duration</Col>
              <Col>{getDurationString(duration ?? 0)}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  };

  const totalCard = () => {
    return (
      <Card
        key="combined"
        className={styles.categoryCard}
        bg="primary-dark"
        border="primary-light"
        text="secondary"
      >
        <Card.Body>
          <Row className={styles.totalRow}>
            <Col>All Activities</Col>
          </Row>
          <hr className={styles.categoryHR} />
          <Row>
            <Col>Total Duration</Col>
            <Col>{getDurationString(totalDuration ?? 0)}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <div className={styles.headerDiv}>
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
      </div>
      <div className={styles.categoryDiv}>
        {totalCard()}
        {categoryCards()}
      </div>
    </Container>
  );
}
