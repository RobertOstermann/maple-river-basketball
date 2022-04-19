import { Container } from "react-bootstrap";

import styles from "./Player.module.scss";

export default function Player() {
  return (
    <Container fluid className={styles.container}>
      <h1>Player</h1>
    </Container>
  );
}
