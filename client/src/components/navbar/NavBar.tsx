import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { PermissionLevels } from "../../shared/constants/PermissionLevels";
import UserModel from "../../shared/models/UserModel";
import RouterHelper, { RouterHelperInterface } from "../routers/RouterHelper";
import UserRequests from "../shared/UserRequests";

import styles from "../navbar/NavBar.module.scss";

export default function NavBar() {
  const [routes, setRoutes] = useState<any>();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getRoutes().then((elements) => {
      setRoutes(elements);
    });
  }, []);

  const mapRoutes = (routes: any) => {
    return Object.values(routes).map(
      (tab: RouterHelperInterface | any, index) => (
        <Nav.Item key={`tab-${index}`}>
          <NavLink
            end
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
    try {
      const token = await getAccessTokenSilently();
      const user: UserModel = await UserRequests.getUser(token);

      if (
        user.permissionLevel === PermissionLevels.admin.id ||
        user.permissionLevel === PermissionLevels.coach.id
      ) {
        return mapRoutes(RouterHelper.coach);
      }

      return mapRoutes(RouterHelper.player);
    } catch (error) {
      console.log(error);

      return mapRoutes(RouterHelper.player);
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
          {routes}
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}
