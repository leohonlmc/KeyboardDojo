import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Account, Leaderboard } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
