import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

import NavBar from "./components/navbar/NavBar";
import Router from "./components/routers/Router";

import "./index.scss";
import styles from "./MapleRiverBasketball.module.scss";

export default function MapleRiverBasketball() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container id="maple-river-basketball" className={styles.page}>
      <NavBar />
      <Container className={styles.mapleRiverBasketball}>
        <Router />
      </Container>
    </Container>
  );
}
