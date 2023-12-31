import "../../Footer.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="text-center text-white Footer">
      <div className="text-center p-3">
        © 2023 Copyright:{" "}
        <a className="text-white" href="https://keyboarddojo.onrender.com/">
          keyboardDojo.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
