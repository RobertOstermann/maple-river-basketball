import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component, ...args }: any) => (
  <Route element={withAuthenticationRequired(component)} {...args} />
);

export default ProtectedRoute;
