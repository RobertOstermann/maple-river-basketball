import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { PermissionLevels } from "../../shared/constants/PermissionLevels";
import User from "../../shared/models/User";
import RouterHelper, { RouterHelperInterface } from "../routers/RouterHelper";
import { GetUser } from "../shared/UserRequests";

import styles from "./NavBar.module.scss";

export default function NavBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [routes, setRoutes] = useState();

  useEffect(() => {
    setIsLoading(true);

    getRoutes();
  }, []);

  const getRoutes = async () => {
    try {
      const user = await GetUser();

      if (
        user.permissionLevel === PermissionLevels.admin.id ||
        user.permissionLevel === PermissionLevels.coach.id
      ) {
        return Object.values(RouterHelper.coach).map(
          (tab: RouterHelperInterface, index) => (
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      bg="navbar"
      fixed="bottom"
      id="navbar"
      role="navigation"
      variant="dark"
    >
      <Nav justify className="w-100">
        {Object.values(RouterHelper.coach).map(
          (tab: RouterHelperInterface, index) => (
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
        )}
      </Nav>
    </Navbar>
  );
}
