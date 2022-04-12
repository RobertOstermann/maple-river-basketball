import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

export interface RouterHelperInterface {
  path: string;
  label: string;
  icon: fontAwesome.IconDefinition;
}

const RouterHelper = {
  coach: {
    home: {
      path: "/",
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
    history: {
      path: "/coach/players/entry-history",
      label: "History",
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
      path: "/",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    newEntry: {
      path: "/player/new-entry",
      label: "Entry",
      icon: fontAwesome.faPlus,
    },
    history: {
      path: "/player/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
    profile: {
      path: "/player/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
  },
};

// Array of all routes accessible by coaches
export const COACH_ROUTES = RouterHelper.coach;
// Array of all routes accessible by players
export const PLAYER_ROUTES = RouterHelper.player;

export default RouterHelper;
