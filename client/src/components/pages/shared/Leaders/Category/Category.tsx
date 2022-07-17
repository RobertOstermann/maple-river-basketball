import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../../shared/constants/ActivityTypes";
import Loading from "../../Loading/Loading";
import { getDurationString } from "../Leaders";

import styles from "../Leaders.module.scss";

export default function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { id } = useParams();
  const categoryId = parseInt(id ? id : "0");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const users: UserModel[] = await UserRequests.getAllPlayers(token);

      users.forEach((user) => {
        user.entries = user.entries?.filter((entry) => {
          return entry.activityType === categoryId;
        });
      });

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

  const getCategoryLeaders = () => {
    return (
      <Card
        key={getActivityType(categoryId)}
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

  const getActivityType = (id: number) => {
    let ui = "";
    Object.values(ActivityTypes).map((activityType: ActivityTypeInterface) => {
      if (id === activityType.id) {
        ui = activityType.ui;
      }
    });

    return ui;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <div className={styles.headerDiv}>
        <h2>{getActivityType(categoryId)}</h2>
      </div>
      <div className={styles.totalsDiv}>{getCategoryLeaders()}</div>
    </Container>
  );
}
