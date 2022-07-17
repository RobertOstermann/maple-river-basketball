import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import RouterHelper from "../../../routers/RouterHelper";

import styles from "./Leaders.module.scss";

export const getDurationString = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const hoursString =
    hours > 0 ? (hours === 1 ? `${hours} Hour ` : `${hours} Hours `) : "";
  const minutes = duration % 60;
  const minutesString = `${minutes} minutes`;

  return `${hoursString}${minutesString}`;
};

export default function Leaders() {
  const getTotalsButton = () => {
    return (
      <Container className={styles.buttonDiv}>
        <NavLink end to={RouterHelper.shared.leaders_totals.path}>
          <Row>
            <Col>
              <Button className={styles.button} size="lg">
                Totals
              </Button>
            </Col>
          </Row>
        </NavLink>
      </Container>
    );
  };

  const getCategoryButtons = () => {
    return Object.values(ActivityTypes).map(
      (activityType: ActivityTypeInterface) => {
        return (
          <Container className={styles.buttonDiv}>
            <NavLink
              end
              to={`${RouterHelper.shared.leaders_category.path}/${activityType.id}`}
            >
              <Row>
                <Col>
                  <Button className={styles.button} size="lg">
                    {activityType.ui}
                  </Button>
                </Col>
              </Row>
            </NavLink>
          </Container>
        );
      }
    );
  };

  return (
    <Container fluid>
      <div className={styles.totalsDiv}>{getTotalsButton()}</div>
      <div className={styles.totalsDiv}>{getCategoryButtons()}</div>
    </Container>
  );
}
