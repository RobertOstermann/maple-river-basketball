import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";

import EntryRequests from "../../../../api/entry/EntryRequests";
import UserEntryModel from "../../../../api/entry/UserEntryModel";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import { useAuthenticationStore } from "../../../../store/authentication/AuthenticationStore";
import Loading from "../../shared/Loading/Loading";

import styles from "./History.module.scss";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<UserEntryModel[]>([]);

  const token = useAuthenticationStore((state) => state.token);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "",
    refetchOnWindowFocus: false,
    retry: 1,
    cacheTime: 30 * 60 * 1000, // 30 minutes
  };
  const queryResponse = useQuery(
    ["coach-history"],
    () => EntryRequests.getAllEntries(token),
    queryOptions
  );

  useEffect(() => {
    if (queryResponse.isSuccess) {
      const data: UserEntryModel[] = queryResponse.data as UserEntryModel[];
      if (!data) return;

      setEntries(data);
      setIsLoading(false);
    }

    if (queryResponse.isError) {
      setIsLoading(false);
    }
  }, [queryResponse.data, queryResponse.isSuccess]);

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

  const entryCards = () => {
    return entries.map((entry, index) => {
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
              <Col>Player</Col>
              <Col>{`${entry.firstName} ${entry.lastName}`}</Col>
            </Row>
            <hr className={styles.entryHR} />
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
      <div className={styles.entryDiv}>{entryCards()}</div>
    </Container>
  );
}
