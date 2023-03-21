import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { PermissionLevels } from "../../../../shared/constants/PermissionLevels";
import { useStoreUser } from "../../../../store/user/UserStore";
import CoachHome from "../../coaches/Home/CoachHome";
import PlayerHome from "../../players/Home/PlayerHome";
import Loading from "../Loading/Loading";

import styles from "./Home.module.scss";

export default function Home() {
  const user = useStoreUser((state) => state.user);

  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

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

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    return <Container fluid>{loginButton()}</Container>;
  }

  switch (user.permissionLevel) {
    case PermissionLevels.coach.id:
      return <CoachHome />;
    case PermissionLevels.player.id:
      return <PlayerHome />;
    default:
      return (
        <Container fluid>There was a problem loading the home page.</Container>
      );
  }
}
