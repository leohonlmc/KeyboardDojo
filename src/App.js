import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Account } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
