import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../context/auth-context";
import "./Header.css";

function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  const [id, setId] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const myContext = useContext(AuthContext);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const data = {};
      data["email"] = myContext.email;
      const res = await axios.post("/users/getUser", data);
      setId(res.data.user._id);
      if (res.data.user.profileImg) setProfileImg(res.data.user.profileImg);
    }
    fetchUserInfo();
  }, [profileImg]);

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
              alt="My Profile"
            />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav className="ml-auto align-items-center" navbar>
              {/* <form className="nav-link">
              <FormGroup>
                <Input
                  required
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for blogs..."
                  className="search"
                />
              </FormGroup>
              </form> */}
              {myContext.token && (
                <NavItem onClick={toggleNav}>
                  <NavLink className="nav-link create" to="/create_blog">
                    New Blog
                  </NavLink>
                </NavItem>
              )}
              {myContext.token && (
                <NavItem onClick={toggleNav}>
                  <NavLink className="nav-link user" to={`/dashboard/${id}`}>
                    <img
                      className="profile_img"
                      src={
                        profileImg
                          ? `data:image/png;base64,${profileImg}`
                          : "/assets/user.png"
                      }
                      height="40"
                      alt="Profile"
                    />
                  </NavLink>
                </NavItem>
              )}
              {!myContext.token && (
                <NavItem>
                  <NavLink className="header__login" to="/login">
                    Login
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            {myContext.token && (
              <Button
                className="nav-link"
                color="primary"
                onClick={myContext.logout}
              >
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
