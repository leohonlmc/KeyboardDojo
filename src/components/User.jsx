import "../User.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_ENDPOINT } = process.env;

function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_API_ENDPOINT}/user/${localStorage.getItem("user")}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={mode}>
      <Header />

      <div className="info-div">
        <h2>User info</h2>
        <br />

        <input type="text" value={user._id} disabled="true" />
        <input type="text" value={user.email} disabled="true" />
        <input type="text" value={~~user.score} disabled="true" />

        <div className="mode">
          <span onClick={() => setMode("light")}>Light</span>
          <span onClick={() => setMode("dark")}>Dark</span>
        </div>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }}
          style={{ marginTop: "20px" }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default User;
