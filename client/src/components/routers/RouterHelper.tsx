import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

export interface RouterHelperInterface {
  path: string;
  label: string;
  icon: fontAwesome.IconDefinition;
}

const RouterHelper = {
  admin: {
    home: {
      path: "/admin",
      label: "Home",
      icon: fontAwesome.faHome,
    },
  },
  coach: {
    home: {
      path: "/coach",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    players: {
      path: "/coach/players",
      label: "Players",
      icon: fontAwesome.faPeopleGroup,
    },
    leaders: {
      path: "/coach/players/team-leaders",
      label: "Leaders",
      icon: fontAwesome.faBasketball,
    },
    entries: {
      path: "/coach/players/entry-history",
      label: "Entries",
      icon: fontAwesome.faHistory,
    },
    profile: {
      path: "/coach/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
  },
  player: {
    home: {
      path: "/player",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    history: {
      path: "/player/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
    newEntry: {
      path: "/player/new-entry",
      label: "Entry",
      icon: fontAwesome.faPlus,
    },
    profile: {
      path: "/player/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
  },
};

// Array of all routes accessible by administrators
export const ADMINISTRATOR_ROUTES = RouterHelper.admin;
// Array of all routes accessible by coaches
export const COACH_ROUTES = RouterHelper.coach;
// Array of all routes accessible by players
export const PLAYER_ROUTES = RouterHelper.player;

export default RouterHelper;
