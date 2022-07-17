import * as fontAwesome from "@fortawesome/free-solid-svg-icons";

export interface RouterHelperInterface {
  path: string;
  label: string;
  icon: fontAwesome.IconDefinition;
}

const RouterHelper = {
  // Coach Routes
  coach: {
    players: {
      end: false,
      path: "/coach/players",
      label: "Players",
      icon: fontAwesome.faPeopleGroup,
    },
    history: {
      end: true,
      path: "/coach/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
  },
  // Player Routes
  player: {
    newEntry: {
      end: true,
      path: "/player/new-entry",
      label: "Entry",
      icon: fontAwesome.faPlus,
    },
    history: {
      end: true,
      path: "/player/history",
      label: "History",
      icon: fontAwesome.faHistory,
    },
  },
  // Shared Routes
  shared: {
    home: {
      end: true,
      path: "/",
      label: "Home",
      icon: fontAwesome.faHome,
    },
    leaders: {
      end: false,
      path: "/leaders",
      label: "Leaders",
      icon: fontAwesome.faBasketball,
    },
    leaders_category: {
      end: true,
      path: "/leaders/category",
      label: "Category",
      icon: null,
    },
    leaders_totals: {
      end: true,
      path: "/leaders/totals",
      label: "Totals",
      icon: null,
    },
    profile: {
      end: true,
      path: "/profile",
      label: "Profile",
      icon: fontAwesome.faUser,
    },
  },
};

export default RouterHelper;
