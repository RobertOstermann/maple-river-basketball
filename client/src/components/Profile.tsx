import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && isAuthenticated) {
    const { name, picture, email } = user;

    return (
      <div>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3">
            <img
              src={picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{name}</h2>
            <p className="lead text-muted">{email}</p>
          </div>
        </div>
        <div className="row">{JSON.stringify(user, null, 2)}</div>
      </div>
    );
  }

  return <React.Fragment />;
};

export default Profile;
