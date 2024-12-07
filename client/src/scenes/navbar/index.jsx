import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo" onClick={() => navigate("/home")}>
          Snapzy
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
      </div>

      <div className="navbar-right">
        <button onClick={() => dispatch(setMode())} className="theme-toggle">
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <span className="icon">💬</span>
        <span className="icon">🔔</span>
        <span className="icon">❓</span>
        <select
          className="navbar-select"
          onChange={(e) => {
            if (e.target.value === "logout") {
              dispatch(setLogout());
              navigate("/");
            }
          }}
        >
          <option value="fullName">{fullName}</option>
          <option value="logout">Log Out</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;

