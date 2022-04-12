import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth0/ProtectedRoute";
import * as CoachHistory from "../pages/coaches/History/History";
import Entry from "../pages/players/Entry/Entry";
import History from "../pages/players/History/History";
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
        path={COACH_ROUTES.history.path}
        element={<ProtectedRoute component={CoachHistory.History} />}
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
        element={<ProtectedRoute component={History} />}
      />
      <Route
        path={PLAYER_ROUTES.profile.path}
        element={<ProtectedRoute component={Profile} />}
      />
    </Routes>
  );
}
