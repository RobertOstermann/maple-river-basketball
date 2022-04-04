import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthenticationProviderWithHistory = ({ children }: any) => {
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE ?? "";
  const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? "";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? "";

  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  console.log("Initializing Authentication Provider");
  console.log(audience);
  console.log(domain);
  console.log(clientId);

  return (
    <Auth0Provider
      audience={audience}
      clientId={clientId}
      domain={domain}
      onRedirectCallback={onRedirectCallback}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthenticationProviderWithHistory;
