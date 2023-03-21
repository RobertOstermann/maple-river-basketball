import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery, UseQueryOptions } from "react-query";
import { RedirectLoginOptions, useAuth0 } from "@auth0/auth0-react";

import UserModel from "./api/user/UserModel";
import UserRequests from "./api/user/UserRequests";
import NavBar from "./components/navbar/NavBar";
import Router from "./components/routers/Router";
import Setup from "./components/setup/Setup";
import { useStoreAuthentication } from "./store/authentication/AuthenticationStore";
import { useStoreUser } from "./store/user/UserStore";

import "./index.scss";
import styles from "./MapleRiverBasketball.module.scss";

export default function MapleRiverBasketball() {
  const authentication = useAuth0();

  const setToken = useStoreAuthentication((state) => state.setToken);

  const redirectOptions: RedirectLoginOptions = {
    authorizationParams: { prompt: "login" }
  };

  useEffect(() => {
    if (authentication.isLoading) return;
    if (authentication.isAuthenticated) {
      authentication.getAccessTokenSilently().then((token) => {
        setToken(token);
      }).catch(() => {
        authentication.loginWithRedirect(redirectOptions);
      });
    }
  }, [authentication, authentication.isAuthenticated]);

  return (
    <Container fluid id="maple-river-basketball" className={styles.page}>
      <Setup />
      <NavBar />
      <Container fluid className={styles.mapleRiverBasketball}>
        <Router />
      </Container>
    </Container>
  );
}
