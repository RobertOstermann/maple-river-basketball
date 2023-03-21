import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthenticationProviderWithHistory = ({ children }: any) => {
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE ?? "https://maple-river-basketball.com/api/v1";
  const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? "maple-river-basketball.us.auth0.com";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? "Xzac7ckkszykz9YporyR3DbTiAKoT5EV";

  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

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
