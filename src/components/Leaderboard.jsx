import "../Leaderboard.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";

const { REACT_APP_API_ENDPOINT } = process.env;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/leaderboard`)
      .then((res) => {
        setLeaderboard(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
      });
  }, []);

  return (
    <div className="Home">
      <Header />
      <div className="inner-div">
        <div id="header">
          <h1>Ranking</h1>
        </div>
        <div id="leaderboard">
          <div className="ribbon"></div>
          <table>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td className="number">{index + 1}</td>
                  <td className="name">{entry.email}</td>
                  <td className="points">{entry.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
