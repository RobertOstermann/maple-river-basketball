import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import EntryModel from "../../../../api/entry/EntryModel";
import UserModel from "../../../../api/user/UserModel";
import UserRequests from "../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import RouterHelper from "../../../routers/RouterHelper";
import Loading from "../../shared/Loading/Loading";

import styles from "./Players.module.scss";

export function Players() {
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

  const getTotals = (entries: EntryModel[]) => {
    return Object.values(ActivityTypes).map(
      (activityType: ActivityTypeInterface) => {
        const totalDuration = entries
          .filter((entry) => entry.activityType === activityType.id)
          .reduce(
            (previous, { activityDuration }) =>
              previous + (activityDuration ? activityDuration : 0),
            0
          );
        return (
          <React.Fragment>
            <hr className={styles.userHR} />
            <Row>
              <Col>{activityType.ui}</Col>
              <Col>{getDurationString(totalDuration)}</Col>
            </Row>
          </React.Fragment>
        );
      }
    );
  };

  const userCards = () => {
    return users.map((user, index) => {
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
              <Col>Name</Col>
              <Col>{`${user.firstName} ${user.lastName}`}</Col>
            </Row>
            <hr className={styles.userHR} />
            <Row>
              <Col>Email</Col>
              <Col>{user.email}</Col>
            </Row>
            <hr className={styles.userHR} />
            <Row>
              <Col>Class</Col>
              <Col>{user.graduationYear?.toString()}</Col>
            </Row>
            <hr className={styles.userHR} />
            <Row>
              <Col>
                <NavLink
                  end
                  to={`${RouterHelper.coach.players.path}/${user.id}`}
                >
                  <Button
                    variant={"primary"}
                    onClick={undefined}
                    className={styles.userButton}
                  >
                    Details
                  </Button>
                </NavLink>
              </Col>
            </Row>
            {/* {getTotals(user.entries ? user.entries : [])} */}
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
      <div className={styles.userDiv}>{userCards()}</div>
    </Container>
  );
}
