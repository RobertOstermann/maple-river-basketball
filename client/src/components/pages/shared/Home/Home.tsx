import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import styles from "./Home.module.scss";

export default function Home() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

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
    return <Container>Loading...</Container>;
  }

  if (!isAuthenticated) {
    return <Container fluid>{loginButton()}</Container>;
  }

  // Return a home page for either coaches or player
  return <Container fluid>Return a home page for coach or player</Container>;
}
