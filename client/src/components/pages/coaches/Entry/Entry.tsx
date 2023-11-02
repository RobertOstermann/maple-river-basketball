import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { NavLink, useParams } from "react-router-dom";

import EntryRequests from "../../../../api/entry/EntryRequests";
import UserModel from "../../../../api/user/UserModel";
import UserRequests from "../../../../api/user/UserRequests";
import {
  ActivityTypeInterface,
  ActivityTypes,
} from "../../../../shared/constants/ActivityTypes";
import { useStoreAuthentication } from "../../../../store/authentication/AuthenticationStore";
import RouterHelper from "../../../routers/RouterHelper";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Entry.module.scss";

export default function CoachEntry() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserModel | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [activity, setActivity] = useState<number>(ActivityTypes.game.id);
  const [duration, setDuration] = useState<number>(15);
  const [date, setDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = useStoreAuthentication((state) => state.token);

  const queryOptions: UseQueryOptions<unknown, unknown, unknown, any> = {
    enabled: token !== "" && id !== undefined,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  };
  const queryResponse = useQuery(
    [`get-user-${id}`],
    () => UserRequests.getUserById(parseInt(id ?? "0"), token),
    queryOptions
  );

  const mutation = useMutation({
    mutationFn: () => EntryRequests.createEntry(token, {
      authId: user?.authId,
      activityType: activity,
      activityDuration: duration,
      activityDate: date,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setSuccess(true);
    },
    onError: () => {
      setSuccess(false);
    },
    onSettled: () => {
      setShowModal(true);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (queryResponse.isSuccess || queryResponse.isError) {
      setIsLoading(false);
    }

    if (queryResponse.isSuccess) {
      const user: UserModel = queryResponse.data as UserModel;
      if (!user) return;

      setUser(user);
    }
  }, [queryResponse.data, queryResponse.isSuccess, queryResponse.isError]);

  const submitEntry = async () => {
    setIsLoading(true);
    mutation.mutate();
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

    let index = 0;
    while (currentDuration <= maxDuration) {
      currentDuration += 15;
      const hours = Math.floor(currentDuration / 60);
      const hoursString =
        hours > 0 ? (hours === 1 ? `${hours} Hour ` : `${hours} Hours `) : "";
      const minutes = currentDuration % 60;
      const minutesString = `${minutes} minutes`;

      options.push(
        <option
          key={`duration-${index}`}
          value={currentDuration}
        >{`${hoursString}${minutesString}`}</option>
      );
      index++;
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
      <NavLink
        end
        to={`${RouterHelper.coach.players.path}/${id}`}
      >
        <Button className={styles.button} size="lg">
          {user?.firstName} {user?.lastName}
        </Button>
      </NavLink>
      <Form className={styles.form}>
        <Form.Group className={styles.formGroup}>{dateButton()}</Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Activity</Form.Label>
          <Form.Select
            onChange={(event) => setActivity(parseInt(event.target.value))}
          >
            {Object.values(ActivityTypes).map(
              (activityType: ActivityTypeInterface, index: number) => {
                return (
                  <option value={activityType.id} key={`activity-${index}`}>{activityType.ui}</option>
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
