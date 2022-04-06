import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Nav, Navbar, NavItem, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthenticationNavBar from "components/navbar/AuthenticationNavBar";
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
      <Nav className="w-100">
        <Row className="w-100">
          {Object.values(RouterHelper.coach).map(
            (tab: RouterHelperInterface, index) => (
              <Col key={`tab-col-coach-${index}`}>
                <NavItem key={`tab-coach-${index}`}>
                  <NavLink
                    to={tab.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.link
                    }
                  >
                    <Row className="d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon} />
                      {tab.label}
                    </Row>
                  </NavLink>
                </NavItem>
              </Col>
            )
          )}
        </Row>
      </Nav>
    </Navbar>
  );
}
