import { Container, ProgressBar } from "react-bootstrap";

import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <Container fluid className={styles.spinnerDiv}>
      <ProgressBar
        animated
        now={100}
        variant="primary-light"
        className={styles.spinner}
      />
    </Container>
  );
}
