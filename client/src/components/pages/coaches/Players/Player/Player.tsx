import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import styles from "./Player.module.scss";

export default function Player() {
  const { id } = useParams();
  return (
    <Container fluid className={styles.container}>
      <h1>Player {id}</h1>
    </Container>
  );
}
