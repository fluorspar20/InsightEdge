import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import "./Header.css";

function Header() {
  const [isNavOpen, setNavOpen] = useState(false);

  const myContext = useContext(AuthContext);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  //render() {
  return (
    <div className="header">
      <Navbar light expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="/assets/logo_black.png"
              height="55"
              width="auto"
              alt="Ristorante con Fusion"
            />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            {/* <Nav className="ml-auto" navbar>
              <NavItem onClick={toggleNav}>
                <NavLink className="nav-link" to="/menu">
                  Search    // search bar here after login
                </NavLink>
              </NavItem>
              <NavItem onClick={toggleNav}>
                <NavLink className="nav-link" to="/contactus">
                  Profile   // profile here after login
                </NavLink>
              </NavItem>
            </Nav> */}
            <Nav className="ml-auto" navbar>
              {!myContext.token && (
                <NavItem>
                  <NavLink className="header__login" to="/login">
                    Login
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            {myContext.token && (
              <Button color="primary" onClick={myContext.logout}>
                Logout
              </Button>
            )}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
  // }
}

export default Header;
