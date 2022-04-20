import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth0/ProtectedRoute";
import * as CoachHistory from "../pages/coaches/History/History";
import Player from "../pages/coaches/Players/Player/Player";
import { Players } from "../pages/coaches/Players/Players";
import Entry from "../pages/players/Entry/Entry";
import History from "../pages/players/History/History";
import Home from "../pages/shared/Home/Home";
import Invalid from "../pages/shared/Invalid/Invalid";
import { Leaders } from "../pages/shared/Leaders/Leaders";
import Profile from "../pages/shared/Profile/Profile";
import { COACH_ROUTES, PLAYER_ROUTES } from "./RouterHelper";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Coach Routes */}
      <Route
        path={COACH_ROUTES.players.path}
        element={<ProtectedRoute component={Players} />}
      />
      <Route
        path={`${COACH_ROUTES.players.path}/:id`}
        element={<ProtectedRoute component={Player} />}
      />
      <Route
        path={COACH_ROUTES.leaders.path}
        element={<ProtectedRoute component={Leaders} />}
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
      {/* Invalid Routes */}
      <Route path="*" element={<ProtectedRoute component={Invalid} />} />
    </Routes>
  );
}
