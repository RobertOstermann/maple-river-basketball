import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

export interface RouterHelperInterface {
  path: string;
  label: string;
  icon: fontAwesome.IconDefinition;
}

const RouterHelper = {
  coach: {
    home: {
      end: true,
      path: "/",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    players: {
      end: false,
      path: "/coach/players",
      label: "Players",
      icon: fontAwesome.faPeopleGroup,
    },
    leaders: {
      end: true,
      path: "/leaders",
      label: "Leaders",
      icon: fontAwesome.faBasketball,
    },
    history: {
      end: true,
      path: "/coach/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
    profile: {
      end: true,
      path: "/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
  },
  player: {
    home: {
      end: true,
      path: "/",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    newEntry: {
      end: true,
      path: "/player/new-entry",
      label: "Entry",
      icon: fontAwesome.faPlus,
    },
    leaders: {
      end: true,
      path: "/leaders",
      label: "Leaders",
      icon: fontAwesome.faBasketball,
    },
    history: {
      end: true,
      path: "/player/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
    profile: {
      end: true,
      path: "/profile",
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
