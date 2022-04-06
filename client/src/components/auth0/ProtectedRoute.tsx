import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";

interface ProtectedRouteProps {
  component: ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <div>Loading...</div>;
    },
  });

  return <Component />;
};

export default ProtectedRoute;
