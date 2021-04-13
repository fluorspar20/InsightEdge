import React from "react";
import { NavLink } from "react-router-dom";

import "./Footer.css";

function Footer() {
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
              <li>Home</li>
              <li>Login</li>
              <li>My Profile</li>
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
