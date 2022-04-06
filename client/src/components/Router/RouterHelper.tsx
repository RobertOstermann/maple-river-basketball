import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

const RouterHelper = {
  admin: {
    home: {
      path: "/admin",
      label: "Home",
      icon: fontAwesome.faHome,
    },
  },
  coach: {
    entries: {
      path: "/coach/players/entry-history",
      label: "Entries",
      icon: fontAwesome.faHistory,
    },
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
    profile: {
      path: "/coach/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
    teamLeaders: {
      path: "/coach/players/team-leaders",
      label: "Leaders",
      icon: fontAwesome.faBasketball,
    },
  },
  player: {
    history: {
      path: "/player/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
    home: {
      path: "/player",
      label: "Home",
      icon: fontAwesome.faHome,
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
