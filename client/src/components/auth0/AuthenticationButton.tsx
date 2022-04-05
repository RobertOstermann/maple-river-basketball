import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "components/auth0/LoginButton";
import LogoutButton from "components/auth0/LogoutButton";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
