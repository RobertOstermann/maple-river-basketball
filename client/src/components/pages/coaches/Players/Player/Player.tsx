import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";
import { NavLink, useParams } from "react-router-dom";

import EntryModel from "../../../../../api/entry/EntryModel";
import UserModel from "../../../../../api/user/UserModel";
import UserRequests from "../../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../../shared/constants/ActivityTypes";
import { useStoreAuthentication } from "../../../../../store/authentication/AuthenticationStore";
import RouterHelper from "../../../../routers/RouterHelper";
import { getDurationString } from "../../../shared/Leaders/Leaders";
import Loading from "../../../shared/Loading/Loading";

import styles from "./Player.module.scss";

export default function Player() {
  const { id } = useParams();

  const token = useStoreAuthentication((state) => state.token);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserModel | undefined>();
  const [totals, setTotals] = useState<any[]>([]);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "" && id !== undefined,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  };
  const queryResponse = useQuery(
    [`get-user-${id}`],
    () => UserRequests.getUserById(parseInt(id ?? "0"), token),
    queryOptions
  );

  useEffect(() => {
    if (queryResponse.isSuccess || queryResponse.isError) {
      setIsLoading(false);
    }

    if (queryResponse.isSuccess) {
      const user: UserModel = queryResponse.data as UserModel;
      if (!user) return;

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
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

  const getHeader = () => {
    if (!user) {
      return <h2>Invalid ID</h2>;
    }

    return (
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
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

  const entryCards = () => {
    if (!user?.entries) return <React.Fragment />;
    return user.entries.map((entry, index) => {
      return (
        <Card
          key={index}
          className={styles.entryCard}
          bg="primary-dark"
          border="primary-light"
          text="secondary"
        >
          <Card.Body>
            <Row>
              <Col>Date</Col>
              <Col>
                {new Date(entry.activityDate ?? Date.now())
                  .toISOString()
                  .slice(0, 10)}
              </Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Activity</Col>
              <Col>{getActivityType(entry.activityType ?? 0)}</Col>
            </Row>
            <hr className={styles.entryHR} />
            <Row>
              <Col>Duration</Col>
              <Col>{getDurationString(entry.activityDuration ?? 0)}</Col>
            </Row>
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
      <div className={styles.headerDiv}>{getHeader()}</div>
      <NavLink
        end
        to={`${RouterHelper.coach.players.path}/${id}/new-entry`}
      >
        <Button className={styles.button} size="lg">
          Add Entry
        </Button>
      </NavLink>
      <div className={styles.categoryDiv}>
        {totalCard()}
        {categoryCards()}
      </div>
      <div className={styles.historyHeader}>
        <h2>History</h2>
      </div>
      <div className={styles.historyDiv}>{entryCards()}</div>
    </Container>
  );
}
