import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import RouterHelper, { RouterHelperInterface } from "../Router/RouterHelper";

import styles from "./NavBar.module.scss";

export default function NavBar() {
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
            <Nav.Item key={`tab-coach-${index}`}>
              <NavLink
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
