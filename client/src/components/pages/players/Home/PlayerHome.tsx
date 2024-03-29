import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";

import EntryModel from "../../../../api/entry/EntryModel";
import EntryRequests from "../../../../api/entry/EntryRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import { useStoreAuthentication } from "../../../../store/authentication/AuthenticationStore";
import Loading from "../../shared/Loading/Loading";

import styles from "./PlayerHome.module.scss";

export default function PlayerHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState<any[]>([]);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const token = useStoreAuthentication((state) => state.token);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "",
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  };
  const queryResponse = useQuery(
    ["get-user-entries"],
    () => EntryRequests.getUserEntries(token),
    queryOptions
  );

  useEffect(() => {
    if (queryResponse.isSuccess || queryResponse.isError) {
      setIsLoading(false);
    }

    if (queryResponse.isSuccess) {
      const data: EntryModel[] = queryResponse.data as EntryModel[];
      if (!data) return;

      const updatedTotals: any[] = [];
      let totalDuration = 0;

      Object.values(ActivityTypes).map(
        (activityType: ActivityTypeInterface) => {
          updatedTotals[activityType.id] = 0;
        }
      );

      data.map((entry) => {
        if (entry.activityType !== undefined) {
          totalDuration += entry.activityDuration ? entry.activityDuration : 0;
          if (updatedTotals[entry.activityType]) {
            updatedTotals[entry.activityType] += entry.activityDuration;
          } else {
            updatedTotals[entry.activityType] = entry.activityDuration;
          }
        }
      });

      setTotals(updatedTotals);
      setTotalDuration(totalDuration);
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

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
      <div className={styles.categoryDiv}>
        {totalCard()}
        {categoryCards()}
      </div>
    </Container>
  );
}
