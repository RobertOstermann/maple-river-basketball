import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./components/navbar/NavBar";
import Router from "./components/Router/Router";

import "./index.scss";
import styles from "./MapleRiverBasketball.module.scss";

export default function MapleRiverBasketball() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div id="maple-river-basketball" className={styles.page}>
      <NavBar />
      <div className={styles.mapleRiverBasketball}>
        <Router />
      </div>
    </div>
  );
}
