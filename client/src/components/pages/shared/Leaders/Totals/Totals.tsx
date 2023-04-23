import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";

import UserHelper from "../../../../../api/user/UserHelper";
import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import { useStoreAuthentication } from "../../../../../store/authentication/AuthenticationStore";
import Loading from "../../../shared/Loading/Loading";
import { getDurationString } from "../Leaders";

import styles from "../Leaders.module.scss";

export default function Totals() {
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

      data.sort((first, second) => UserHelper.sortByTotal(first, second));

      setUsers(data);
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

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
