import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import Loading from "../../../shared/Loading/Loading";
import { getDurationString } from "../Leaders";

import styles from "../Leaders.module.scss";

export default function Totals() {
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
              <React.Fragment key={index}>
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <div className={styles.headerDiv}>
        <h2>Totals</h2>
      </div>
      <div className={styles.totalsDiv}>{getTotalsLeaders()}</div>
    </Container>
  );
}
