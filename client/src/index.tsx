import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AuthenticationProviderWithHistory from "components/auth0/AuthenticationProviderWithHistory";
import MapleRiverBasketball from "./MapleRiverBasketball";
import reportWebVitals from "./reportWebVitals";

import "index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProviderWithHistory>
        <MapleRiverBasketball />
      </AuthenticationProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
