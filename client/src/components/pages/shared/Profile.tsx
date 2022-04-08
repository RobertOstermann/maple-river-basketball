import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

import { PermissionLevels } from "../../../shared/constants/PermissionLevels";
import User from "../../../shared/models/User";
import UserRequests from "../../shared/UserRequests";

import styles from "./Profile.module.scss";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({});
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    });
  }, []);

  useEffect(() => {
    const updatedUser = user;
    updatedUser.firstName = firstName;
    updatedUser.lastName = lastName;
    setUser(updatedUser);

    if (user.firstName && user.lastName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName]);

  const getRole = (): string => {
    switch (user.permissionLevel) {
      case PermissionLevels.admin.id:
        return PermissionLevels.admin.ui;
      case PermissionLevels.coach.id:
        return PermissionLevels.coach.ui;
      case PermissionLevels.player.id:
        return PermissionLevels.player.ui;
      default:
        return PermissionLevels.player.ui;
    }
  };

  const getUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const user: User = await UserRequests.getUser(token);

      return user;
    } catch (error) {
      console.log(error);
    }

    return {};
  };

  const submitUser = async () => {
    setIsLoading(true);
    console.log(isLoading);
    try {
      const token = await getAccessTokenSilently();
      await UserRequests.updateUser(token, user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    console.log(isLoading);
  };

  return (
    <Container fluid className={styles.container}>
      <Form className={styles.form}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder={user.email} disabled />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder={getRole()} disabled />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={firstName ? firstName : "Enter First Name"}
            value={firstName ? firstName : undefined}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="email"
            placeholder={lastName ? lastName : "Enter Last Name"}
            value={lastName ? lastName : undefined}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
      </Form>
      <Navbar
        fixed="bottom"
        id="navbar"
        role="navigation"
        variant="dark"
        className={styles.submitDiv}
      >
        <Nav justify className="w-100">
          <Button
            variant={isDisabled ? "secondary" : "primary"}
            size="lg"
            onClick={isDisabled || isLoading ? undefined : submitUser}
            className={styles.submitButton}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Changes"}
          </Button>
        </Nav>
      </Navbar>
    </Container>
  );
}
