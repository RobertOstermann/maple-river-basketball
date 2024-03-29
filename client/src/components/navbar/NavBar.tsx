import React, { useEffect, useState } from "react";
import { Nav, Navbar, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as fontAwesome from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PermissionLevels } from "../../shared/constants/PermissionLevels";
import { useStoreUser } from "../../store/user/UserStore";
import { RouterHelperInterface } from "../routers/RouterHelper";
import NavBarHelper from "./NavBarHelper";

import styles from "../navbar/NavBar.module.scss";

export default function NavBar() {
  const { isLoading } = useAuth0();

  const user = useStoreUser((state) => state.user);

  const [routes, setRoutes] = useState<any>();

  useEffect(() => {
    getRoutes().then((elements) => {
      setRoutes(elements);
    });
  }, [user]);

  const mapRoutes = (routes: any) => {
    return Object.values(routes).map(
      (tab: RouterHelperInterface | any, index) => (
        <Nav.Item key={`tab-${index}`}>
          <NavLink
            end={tab.end}
            to={tab.path}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FontAwesomeIcon size="lg" icon={tab.icon} />
            <div>{tab.label}</div>
          </NavLink>
        </Nav.Item>
      )
    );
  };

  const getRoutes = async () => {
    if (user === undefined) return mapRoutes(NavBarHelper.player);

    try {
      if (
        user.permissionLevel === PermissionLevels.admin.id ||
        user.permissionLevel === PermissionLevels.coach.id
      ) {
        return mapRoutes(NavBarHelper.coach);
      }

      return mapRoutes(NavBarHelper.player);
    } catch (error) {
      console.log(error);

      return mapRoutes(NavBarHelper.player);
    }
  };

  return (
    <React.Fragment>
      <Navbar
        bg="navbar"
        fixed="top"
        id="navbar"
        role="navigation"
        variant="dark"
      >
        <Nav justify className="w-100 justify-content-center">
          <Navbar.Brand className={styles.brand}>
            Maple River Basketball
          </Navbar.Brand>
        </Nav>
      </Navbar>
      <Navbar
        bg="navbar"
        fixed="bottom"
        id="navbar"
        role="navigation"
        variant="dark"
      >
        <Nav justify className="w-100">
          {isLoading || !routes ? (
            <Nav.Item key={"tab-loading"}>
              <Stack className={styles.active} gap={1}>
                <FontAwesomeIcon size="lg" icon={fontAwesome.faBasketball} />
                <div>Loading</div>
              </Stack>
            </Nav.Item>
          ) : (
            routes
          )}
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}
