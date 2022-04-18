import { Container, ProgressBar } from "react-bootstrap";

import styles from "./Invalid.module.scss";

export default function Invalid() {
  return (
    <Container fluid className={styles.container}>
      <h1>Invalid Route</h1>
    </Container>
  );
}
