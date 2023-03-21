import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import UserHelper from "../../../../api/user/UserHelper";
import UserModel from "../../../../api/user/UserModel";
import UserRequests from "../../../../api/user/UserRequests";
import { useStoreAuthentication } from "../../../../store/authentication/AuthenticationStore";
import RouterHelper from "../../../routers/RouterHelper";
import Loading from "../../shared/Loading/Loading";

import styles from "./Players.module.scss";

export default function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);

  const token = useStoreAuthentication((state) => state.token);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "",
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  };
  const queryResponse = useQuery(
    ["get-all-players"],
    () => UserRequests.getAllPlayers(token),
    queryOptions
  );

  useEffect(() => {
    if (queryResponse.isSuccess || queryResponse.isError) {
      setIsLoading(false);
    }

    if (queryResponse.isSuccess) {
      const data: UserModel[] = queryResponse.data as UserModel[];
      if (!data) return;

      data.sort((first, second) => UserHelper.sortUserModels(first, second));
      setUsers(data);
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

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
