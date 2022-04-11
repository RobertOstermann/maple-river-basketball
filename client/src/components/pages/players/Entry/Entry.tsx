import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import DatePicker from "react-datepicker";

import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import EntryModel from "../../../../shared/models/EntryModel";
import EntryRequests from "../../../shared/EntryRequests";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Entry.module.scss";

export default function Entry() {
  const [isLoading, setIsLoading] = useState(false);
  const [entry, setEntry] = useState<EntryModel>({});
  const [activity, setActivity] = useState<number>(ActivityTypes.game.id);
  const [duration, setDuration] = useState<number>(15);
  const [date, setDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const updatedEntry: EntryModel = {
      activityType: activity,
      activityDuration: duration,
      activityDate: date,
    };

    setEntry(updatedEntry);
  }, [activity, duration, date]);

  const submitEntry = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await EntryRequests.createEntry(token, entry);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    setShowModal(true);
    setIsLoading(false);
  };

  const dateButton = () => {
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() - 7);
    const maximumDate = new Date();

    return (
      <Container className={styles.datePicker}>
        <DatePicker
          inline
          useWeekdaysShort
          selected={date}
          minDate={minimumDate}
          maxDate={maximumDate}
          onChange={(updatedDate: Date) =>
            setDate(new Date(updatedDate.setHours(0, 0, 0, 0)))
          }
        />
      </Container>
    );
  };

  const durationOptions = () => {
    const options = [];
    let currentDuration = 15;
    const maxDuration = 180;

    while (currentDuration <= maxDuration) {
      currentDuration += 15;
      const hours = Math.floor(currentDuration / 60);
      const hoursString =
        hours > 0 ? (hours === 1 ? `${hours} Hour ` : `${hours} Hours `) : "";
      const minutes = currentDuration % 60;
      const minutesString = `${minutes} minutes`;

      options.push(
        <option
          value={currentDuration}
        >{`${hoursString}${minutesString}`}</option>
      );
    }

    return options;
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
            variant="primary"
            size="lg"
            onClick={isLoading ? undefined : submitEntry}
            className={styles.submitButton}
          >
            {isLoading ? "Submitting..." : "Submit Entry"}
          </Button>
        </Nav>
      </Navbar>
    );
  };

  const successModal = () => {
    return (
      <Modal size="lg" backdrop="static" centered show={showModal}>
        <Modal.Header>
          <Modal.Title>{success ? "Entry Created" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {success
              ? "The entry was created successfully."
              : "There was a problem creating the entry. Please try again."}
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

  return (
    <Container fluid>
      <Form className={styles.form}>
        <Form.Group className={styles.formGroup}>{dateButton()}</Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Activity</Form.Label>
          <Form.Select
            onChange={(event) => setActivity(parseInt(event.target.value))}
          >
            {Object.values(ActivityTypes).map(
              (activityType: ActivityTypeInterface) => {
                return (
                  <option value={activityType.id}>{activityType.ui}</option>
                );
              }
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Duration</Form.Label>
          <Form.Select
            onChange={(event) => setDuration(parseInt(event.target.value))}
          >
            {durationOptions()}
          </Form.Select>
        </Form.Group>
      </Form>
      {submitButton()}
      {successModal()}
    </Container>
  );
}