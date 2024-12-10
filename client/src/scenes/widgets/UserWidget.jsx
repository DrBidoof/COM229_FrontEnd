import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userWidget.css";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null); // State to store user data
  const token = useSelector((state) => state.auth.token); // Get the token from Redux state
  const navigate = useNavigate();

  // Function to fetch user data
  const getUser = useCallback(async () => {
    try {
      console.log(`Fetching user data for userId: ${userId}`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        return;
      }

      const data = await response.json();
      console.log("User data received:", data);
      setUser(data); // Store user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, token]);

  // Fetch user data when component mounts
  useEffect(() => {
    if (!userId) {
      console.error("UserWidget received undefined userId. Skipping fetch.");
      return;
    }
    getUser();
  }, [getUser, userId]);

  if (!user) {
    return <p>Loading...</p>; // Render a loading message until data is fetched
  }

  // Destructure user properties
  const { firstName, lastName, location, occupation, friends } = user;

  return (
    <div className="widget">
      {/* User Header */}
      <div
        className="user-header"
        onClick={() => navigate(`/profile/${userId}`)} // Navigate to profile page on click
      >
        <div className="user-info">
          <img
            src={picturePath || "/assets/Image.png"}
            alt="User profile"
            className="user-image"
          />
          <div>
            <h4 className="user-name">
              {firstName} {lastName}
            </h4>
            <p className="user-friends">{friends?.length || 0} friends</p>
          </div>
        </div>
        <button className="manage-account">Manage</button>
      </div>

      <hr />

      {/* User Details */}
      <div className="user-details">
        <div className="user-location">
          <span className="icon">📍</span>
          <p>{location || "Location not provided"}</p>
        </div>
        <div className="user-occupation">
          <span className="icon">💼</span>
          <p>{occupation || "Occupation not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
