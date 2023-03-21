import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../pages/shared/Loading/Loading";

const ProtectedRoute: React.FC<any> = ({ component, ...componentProps }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <Loading />;
    },
  });

  return <Component {...componentProps} />;
};

export default ProtectedRoute;
