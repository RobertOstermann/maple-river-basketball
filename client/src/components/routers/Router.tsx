import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth0/ProtectedRoute";
import Entry from "../pages/players/Entry/Entry";
import Home from "../pages/shared/Home/Home";
import Profile from "../pages/shared/Profile/Profile";
import Request from "../Request";
import { COACH_ROUTES, PLAYER_ROUTES } from "./RouterHelper";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Coach Routes */}
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
        path={PLAYER_ROUTES.newEntry.path}
        element={<ProtectedRoute component={Entry} />}
      />
      <Route
        path={PLAYER_ROUTES.history.path}
        element={<ProtectedRoute component={Request} />}
      />
      <Route
        path={PLAYER_ROUTES.profile.path}
        element={<ProtectedRoute component={Profile} />}
      />
    </Routes>
  );
}
