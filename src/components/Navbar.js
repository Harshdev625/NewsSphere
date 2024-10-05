import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Dark from "../Image/night-mode.png";
import Light from "../Image/brightness.png";
import User from "../Image/user.png";

const Navbar = ({ setSignedin }) => {
  const [mode, setMode] = useState("light");

  const handleSignout = useCallback(() => {
    localStorage.removeItem("token");
    setSignedin(false);
  }, [setSignedin]);

  const toggleMode = useCallback(() => {
    const isDark = mode === "dark";
    setMode(isDark ? "light" : "dark");
    document.body.style.backgroundColor = isDark ? "white" : "#333333";
    document.body.style.color = isDark ? "black" : "white";
  }, [mode]);

  const navLinks = [
    { path: "/Business", label: "Business" },
    { path: "/Entertainment", label: "Entertainment" },
    { path: "/Health", label: "Health" },
    { path: "/Science", label: "Science" },
    { path: "/Sports", label: "Sports" },
    { path: "/Technology", label: "Technology" },
  ];

  const dropdownStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    top: 60,
    right: 160,
  };

  const imageStyle = {
    width: "48px",
    padding: "5px",
    backgroundColor: "white",
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        mode === "light" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NewsSphere
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link className="nav-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={mode === "light" ? Dark : Light}
          alt="Mode"
          onClick={toggleMode}
          style={imageStyle}
        />
        <img
          className="btn btn-secondary dropdown-toggle"
          src={User}
          style={imageStyle}
          alt="user"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
        />
        <div style={dropdownStyle}>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/savedarticle">
                Saved Article
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/signin"
                onClick={handleSignout}
              >
                Signout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
