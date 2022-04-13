import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import UserModel from "../../../../api/user/UserModel";
import UserRequests from "../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import Loading from "../../shared/Loading/Loading";

import styles from "./Leaders.module.scss";

export function Leaders() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const users: UserModel[] = await UserRequests.getAllUsers(token);
      setUsers(users);
    } catch (error) {
      console.log(error);
      setUsers([]);
    }
    setIsLoading(false);
  };

  const getDurationString = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const hoursString =
      hours > 0 ? (hours === 1 ? `${hours} Hour ` : `${hours} Hours `) : "";
    const minutes = duration % 60;
    const minutesString = `${minutes} minutes`;

    return `${hoursString}${minutesString}`;
  };

  const getLeaders = () => {
    return Object.values(ActivityTypes).map(
      (activityType: ActivityTypeInterface, index: number) => {
        const user = users.reduce((previous, current) => {
          const previousTotal = previous.entries
            ?.filter((entry) => entry.activityType === activityType.id)
            .reduce(
              (previous, { activityDuration }) =>
                previous + (activityDuration ? activityDuration : 0),
              0
            );
          const currentTotal = current.entries
            ?.filter((entry) => entry.activityType === activityType.id)
            .reduce(
              (previous, { activityDuration }) =>
                previous + (activityDuration ? activityDuration : 0),
              0
            );
          return (previousTotal ? previousTotal : 0) >
            (currentTotal ? currentTotal : 0)
            ? previous
            : current;
        });

        const totalDuration = user.entries
          ?.filter((entry) => entry.activityType === activityType.id)
          .reduce(
            (previous, { activityDuration }) =>
              previous + (activityDuration ? activityDuration : 0),
            0
          );

        return (
          <Card
            key={index}
            className={styles.userCard}
            bg="primary-dark"
            border="primary-light"
            text="secondary"
          >
            <Card.Body>
              <Row>
                <Col>Player</Col>
                <Col>{`${user.firstName} ${user.lastName}`}</Col>
              </Row>
              <hr className={styles.userHR} />
              <Row>
                <Col>{activityType.ui}</Col>
                <Col>
                  {getDurationString(totalDuration ? totalDuration : 0)}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      }
    );
  };

  if (isLoading || users.length === 0) {
    return <Loading />;
  }

  console.log("Return");

  return (
    <Container fluid>
      <div className={styles.userDiv}>{getLeaders()}</div>
    </Container>
  );
}
