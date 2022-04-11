import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { PermissionLevels } from "../../../../shared/constants/PermissionLevels";
import UserModel from "../../../../shared/models/UserModel";
import UserRequests from "../../../shared/UserRequests";
import PlayerHome from "../../players/Home/PlayerHome";
import Loading from "../Loading/Loading";

import styles from "./Home.module.scss";

export default function Home() {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<UserModel>({});

  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getUser().then((user) => {
        setUser(user);
        setIsUserLoading(false);
      });
    }
  }, [isAuthenticated]);

  const getUser = async (): Promise<UserModel> => {
    try {
      const token = await getAccessTokenSilently();
      const user: UserModel = await UserRequests.getUser(token);

      return user;
    } catch (error) {
      console.log(error);
    }

    return {};
  };

  const loginButton = () => {
    return (
      <Navbar
        fixed="bottom"
        id="navbar"
        role="navigation"
        variant="dark"
        className={styles.loginDiv}
      >
        <Nav justify className="w-100">
          <Button
            variant={"primary"}
            size="lg"
            onClick={() => loginWithRedirect()}
            className={styles.loginButton}
          >
            Login
          </Button>
        </Nav>
      </Navbar>
    );
  };

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Container fluid>{loginButton()}</Container>;
  }

  switch (user.permissionLevel) {
    case PermissionLevels.coach.id:
      return <Container fluid>Return a home page for the coach</Container>;
    case PermissionLevels.player.id:
      return <PlayerHome />;
    default:
      return (
        <Container fluid>There was a problem loading the home page.</Container>
      );
  }
}