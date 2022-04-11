import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import Loading from "./pages/shared/Loading/Loading";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (user && isAuthenticated) {
    const { name, picture } = user;

    return (
      <div>
        <Card>
          <Card.Text>{name}</Card.Text>
          <Card.Img variant="top" src={picture} alt="Profile" />
        </Card>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>{JSON.stringify(user, null, 2)}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>Not Logged In</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Profile;
