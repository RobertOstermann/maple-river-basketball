import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth0/ProtectedRoute";
import Profile from "../Profile";
import Request from "../Request";
import {
  ADMINISTRATOR_ROUTES,
  COACH_ROUTES,
  PLAYER_ROUTES,
} from "./RouterHelper";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={Request} />} />
      {/* Administrator Routes */}
      <Route
        path={ADMINISTRATOR_ROUTES.home.path}
        element={<ProtectedRoute component={Request} />}
      />
      {/* Coach Routes */}
      <Route
        path={COACH_ROUTES.home.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={COACH_ROUTES.players.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={COACH_ROUTES.leaders.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={COACH_ROUTES.entries.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={COACH_ROUTES.profile.path}
        element={<ProtectedRoute component={Profile} />}
      />
      {/* Player Routes */}
      <Route
        path={PLAYER_ROUTES.home.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={PLAYER_ROUTES.history.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={PLAYER_ROUTES.newEntry.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={PLAYER_ROUTES.profile.path}
        element={<ProtectedRoute component={Profile} />}
      />
    </Routes>
  );
}
