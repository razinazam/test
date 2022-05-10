import React from "react";
import { Nav, Navbar, NavItem, NavLink, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
export default function Navbarr() {
  return (
    <div>
      <Navbar color="dark" expand="md" light>
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/AddorEdit">
                  Add Customer
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/">
                  List of Customer
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
