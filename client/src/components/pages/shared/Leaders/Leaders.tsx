import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const users: UserModel[] = await UserRequests.getAllPlayers(token);
      users.sort((first, second) => {
        let firstDuration = first.entries?.reduce(
          (previous, { activityDuration }) =>
            previous + (activityDuration ? activityDuration : 0),
          0
        );
        firstDuration = firstDuration ? firstDuration : 0;

        let secondDuration = second.entries?.reduce(
          (previous, { activityDuration }) =>
            previous + (activityDuration ? activityDuration : 0),
          0
        );
        secondDuration = secondDuration ? secondDuration : 0;

        return secondDuration - firstDuration;
      });
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

  const getTotalsLeaders = () => {
    return (
      <Card
        key="totals"
        className={styles.userCard}
        bg="primary-dark"
        border="primary-light"
        text="secondary"
      >
        <Card.Body>
          {users.map((user, index) => {
            const totalDuration = user.entries?.reduce(
              (previous, { activityDuration }) =>
                previous + (activityDuration ? activityDuration : 0),
              0
            );

            return (
              <React.Fragment>
                {index !== 0 && <hr className={styles.userHR} />}
                <Row>
                  <Col>{`${user.firstName} ${user.lastName}`}</Col>
                  <Col>
                    {getDurationString(totalDuration ? totalDuration : 0)}
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Card.Body>
      </Card>
    );
  };

  const getCategoryLeaders = () => {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <div className={styles.headerDiv}>
        <h2>Totals</h2>
      </div>
      <div className={styles.totalsDiv}>{getTotalsLeaders()}</div>
      <div className={styles.headerDiv}>
        <h2>Category Leaders</h2>
      </div>
      <div className={styles.userDiv}>{getCategoryLeaders()}</div>
    </Container>
  );
}
