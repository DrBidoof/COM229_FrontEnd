import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [isNonMobileScreens, setIsNonMobileScreens] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  // Fetch user data with useCallback
  const getUser = useCallback(async () => {
    try {
      if (!token) {
        console.error("Missing token. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setUser(null);
    }
  }, [userId, token, navigate]); // Include necessary dependencies

  // Handle screen size changes for responsiveness
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    const handleMediaChange = (e) => setIsNonMobileScreens(e.matches);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    getUser(); // Safe to include getUser here now
  }, [getUser]);

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={`profile-container ${isNonMobileScreens ? "flex" : "block"}`}>
        <div className="widget-container">
          <div className="spacer"></div>
          <FriendListWidget userId={userId} />
        </div>
        <div className="main-content">
          <MyPostWidget picturePath={user.picturePath} />
          <div className="spacer"></div>
          <PostsWidget userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
