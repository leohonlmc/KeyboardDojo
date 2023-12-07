import "../Account.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import { Link, useNavigate } from "react-router-dom";

const { REACT_APP_API_ENDPOINT } = process.env;

function Account() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/register`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Home Account">
      <Header />
      {login ? (
        <>
          <div className="background">
            <div className=""></div>
            <div className="shape"></div>
          </div>
          <form onSubmit={handleLogin}>
            <h3>Login Here</h3>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={handleEmail}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handlePassword}
            />

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
            <div className=""></div>
            <div className="shape"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <h3>Register Here</h3>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={handleEmail}
            />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button>Register</button>

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
