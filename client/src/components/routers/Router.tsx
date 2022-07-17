import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../auth0/ProtectedRoute";
import * as CoachHistory from "../pages/coaches/History/History";
import Player from "../pages/coaches/Players/Player/Player";
import Players from "../pages/coaches/Players/Players";
import Entry from "../pages/players/Entry/Entry";
import History from "../pages/players/History/History";
import Home from "../pages/shared/Home/Home";
import Invalid from "../pages/shared/Invalid/Invalid";
import Category from "../pages/shared/Leaders/Category/Category";
import Leaders from "../pages/shared/Leaders/Leaders";
import Totals from "../pages/shared/Leaders/Totals/Totals";
import Profile from "../pages/shared/Profile/Profile";
import RouterHelper from "./RouterHelper";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Coach Routes */}
      <Route
        path={RouterHelper.coach.players.path}
        element={<ProtectedRoute component={Players} />}
      />
      <Route
        path={`${RouterHelper.coach.players.path}/:id`}
        element={<ProtectedRoute component={Player} />}
      />
      <Route
        path={RouterHelper.coach.history.path}
        element={<ProtectedRoute component={CoachHistory.History} />}
      />
      {/* Player Routes */}
      <Route
        path={RouterHelper.player.newEntry.path}
        element={<ProtectedRoute component={Entry} />}
      />
      <Route
        path={RouterHelper.player.history.path}
        element={<ProtectedRoute component={History} />}
      />
      {/* Shared Routes */}
      <Route
        path={RouterHelper.shared.leaders.path}
        element={<ProtectedRoute component={Leaders} />}
      />
      <Route
        path={`${RouterHelper.shared.leaders_category.path}/:id`}
        element={<ProtectedRoute component={Category} />}
      />
      <Route
        path={RouterHelper.shared.leaders_totals.path}
        element={<ProtectedRoute component={Totals} />}
      />
      <Route
        path={RouterHelper.shared.profile.path}
        element={<ProtectedRoute component={Profile} />}
      />
      {/* Invalid Routes */}
      <Route path="*" element={<ProtectedRoute component={Invalid} />} />
    </Routes>
  );
}
