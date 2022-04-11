import { Container } from "react-bootstrap";

import NavBar from "./components/navbar/NavBar";
import Router from "./components/routers/Router";

import "./index.scss";
import styles from "./MapleRiverBasketball.module.scss";

export default function MapleRiverBasketball() {
  return (
    <Container fluid id="maple-river-basketball" className={styles.page}>
      <NavBar />
      <Container fluid className={styles.mapleRiverBasketball}>
        <Router />
      </Container>
    </Container>
  );
}
