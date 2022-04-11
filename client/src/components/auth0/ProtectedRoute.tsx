import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";

import Loading from "../pages/shared/Loading/Loading";

interface ProtectedRouteProps {
  component: ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <Loading />;
    },
  });

  return <Component />;
};

export default ProtectedRoute;
