import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../context/auth-context";
import "./Footer.css";

function Footer() {
  const myContext = useContext(AuthContext);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = {};
      data["email"] = myContext.email;
      const res = await axios.post("/users/getUser", data);
      setId(res.data.user._id);
    }
    fetchUser();
  }, []);

  return (
    <div className="footer">
      <div class="container">
        <div className="top-content row row-content">
          <div className="col-12 col-md-3">
            <div className="footer__info">
              <NavLink to="/">
                <img src="/assets/logo_white.png" height="55" alt="" />
              </NavLink>
              <p>We help your insights reach the entire world!</p>
            </div>
          </div>
          <div className="col-12 offset-md-6 col-md-3">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <NavLink className="footer__links" to="/">
                  Home
                </NavLink>
              </li>
              {!myContext.token && (
                <li>
                  <NavLink className="footer__links" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {myContext.token && (
                <li className="footer__links" onClick={myContext.logout}>
                  Logout
                </li>
              )}
              {myContext.token && (
                <li>
                  <NavLink className="footer__links" to={`/dashboard/${id}`}>
                    My Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="row row-content justify-content-center">
          <span>
            Made with 🧡 by{" "}
            <a
              target="_blank"
              style={{ color: "orange" }}
              href="https://github.com/fluorspar20"
            >
              Amogh Dixit
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
