import "../../Header.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a href="/">
          <img
            className="icon"
            src="/KeyboardDojo_1.png"
            alt=""
            style={{ width: "250px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/leaderboard">
                Leaderboard
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/account">
                Account
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
