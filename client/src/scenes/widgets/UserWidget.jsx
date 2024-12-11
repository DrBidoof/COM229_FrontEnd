import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userWidget.css";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

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
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, token]);

  useEffect(() => {
    if (!userId) {
      console.error("UserWidget received undefined userId. Skipping fetch.");
      return;
    }
    getUser();
  }, [getUser, userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName, location, occupation, friends } = user;

  const imgSrc = picturePath
    ? `${process.env.REACT_APP_API_URL}${picturePath}`
    : "/assets/image.png";

  console.log("Picture Path in UserWidget:", picturePath);
  console.log("Resolved Image src:", imgSrc);

  return (
    <div className="widget">
      <div className="user-header" onClick={() => navigate(`/profile/${userId}`)}>
        <div className="user-info">
          <img src={imgSrc} alt="User profile" className="user-image" />
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
