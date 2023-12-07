import "../Account.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import { Link } from "react-router-dom";

function Account() {
  const [login, setLogin] = useState(true);

  return (
    <div className="Home">
      <Header />
      {login ? (
        <>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form>
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button>Log In</button>

            <br />

            <p
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={() => setLogin(false)}
            >
              New user?
            </p>
          </form>
        </>
      ) : (
        <>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form>
            <h3>Register Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button>Log In</button>

            <br />

            <p
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={() => setLogin(true)}
            >
              Current user?
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default Account;
