import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Account, Leaderboard, User, Forum } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}
