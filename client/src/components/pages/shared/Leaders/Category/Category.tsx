import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";
import { useParams } from "react-router-dom";

import UserHelper from "../../../../../api/user/UserHelper";
import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../../shared/constants/ActivityTypes";
import { useStoreAuthentication } from "../../../../../store/authentication/AuthenticationStore";
import Loading from "../../Loading/Loading";
import { getDurationString } from "../Leaders";

import styles from "../Leaders.module.scss";

export default function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { id } = useParams();
  const categoryId = parseInt(id ? id : "0");
  console.log(users);

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
              (previous, entry) =>
                previous + (entry.activityType === categoryId ? (entry.activityDuration ? entry.activityDuration : 0) : 0),
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
