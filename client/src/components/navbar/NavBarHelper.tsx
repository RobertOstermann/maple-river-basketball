import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

import RouterHelper from "../routers/RouterHelper";

export interface NavBarHelperInterface {
  path: string;
  label: string;
  icon: fontAwesome.IconDefinition;
}

const NavBarHelper = {
  // Coach Routes
  coach: {
    home: RouterHelper.shared.home,
    players: RouterHelper.coach.players,
    leaders: RouterHelper.shared.leaders,
    history: RouterHelper.coach.history,
    profile: RouterHelper.shared.profile,
  },
  // Player Routes
  player: {
    home: RouterHelper.shared.home,
    newEntry: RouterHelper.player.newEntry,
    leaders: RouterHelper.shared.leaders,
    history: RouterHelper.player.history,
    profile: RouterHelper.shared.profile,
  },
};

export default NavBarHelper;
