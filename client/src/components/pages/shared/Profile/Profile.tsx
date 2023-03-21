import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import UserModel from "../../../../api/user/UserModel";
import UserRequests from "../../../../api/user/UserRequests";
import { PermissionLevels } from "../../../../shared/constants/PermissionLevels";
import Loading from "../Loading/Loading";

import styles from "./Profile.module.scss";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [user, setUser] = useState<UserModel>({});
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [graduationYear, setGraduationYear] = useState<number | undefined>();
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validGraduationYear, setValidGraduationYear] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGraduationYear(user.graduationYear);
      setIsPageLoading(false);
    });
  }, []);

  useEffect(() => {
    if (validFirstName && validLastName && validGraduationYear) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [validFirstName, validLastName, validGraduationYear]);

  useEffect(() => {
    const updatedUser = user;
    updatedUser.firstName = firstName;
    setUser(updatedUser);

    firstName ? setValidFirstName(true) : setValidFirstName(false);
  }, [firstName]);

  useEffect(() => {
    const updatedUser = user;
    updatedUser.lastName = lastName;
    setUser(updatedUser);

    lastName ? setValidLastName(true) : setValidLastName(false);
  }, [lastName]);

  useEffect(() => {
    const updatedUser = user;
    updatedUser.graduationYear = graduationYear;
    setUser(updatedUser);

    const year = graduationYear ? graduationYear : 0;
    if (year !== 0 && (year < 2023 || year > 2030)) {
      setValidGraduationYear(false);
    } else {
      setValidGraduationYear(true);
    }
  }, [graduationYear]);

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

  const submitUser = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await UserRequests.updateUser(token, user);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    setShowModal(true);
    setIsLoading(false);
  };

  const logoutButton = () => {
    return (
      <Navbar
        fixed="top"
        id="navbar"
        role="navigation"
        variant="dark"
        className={styles.logoutDiv}
      >
        <Nav justify className="w-100">
          <Button
            variant={"primary"}
            size="lg"
            onClick={() => logout({ returnTo: window.location.origin })}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </Nav>
      </Navbar>
    );
  };

  const submitButton = () => {
    return (
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
    );
  };

  const successModal = () => {
    return (
      <Modal size="lg" backdrop="static" centered show={showModal}>
        <Modal.Header>
          <Modal.Title>{success ? "Profile Updated" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {success
              ? "The profile was updated successfully."
              : "There was a problem updating the profile. Please try again."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Container fluid className="d-grid">
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  };

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      {logoutButton()}
      <Form className={styles.form} noValidate>
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
            isInvalid={!validFirstName}
            value={firstName ? firstName : undefined}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={lastName ? lastName : "Enter Last Name"}
            isInvalid={!validLastName}
            value={lastName ? lastName : undefined}
            onChange={(event) => setLastName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a last name.
          </Form.Control.Feedback>
        </Form.Group>
        {user.permissionLevel === PermissionLevels.player.id && (
          <Form.Group className={styles.formGroup}>
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control
              type="number"
              placeholder={
                graduationYear
                  ? graduationYear.toString()
                  : "Enter Graduation Year"
              }
              isInvalid={!validGraduationYear}
              value={graduationYear ? graduationYear : undefined}
              onChange={(event) =>
                setGraduationYear(parseInt(event.target.value))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter a value between 2023 and 2030.
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Form>
      {submitButton()}
      {successModal()}
    </Container>
  );
}
