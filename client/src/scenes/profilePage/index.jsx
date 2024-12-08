import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Get userId from URL
  const token = useSelector((state) => state.token); // Get token from Redux state
  const navigate = useNavigate(); // Initialize navigate
  const [isNonMobileScreens, setIsNonMobileScreens] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  const getUser = async () => {
    try {
      console.log("Fetching user data with userId:", userId);
      console.log("Using token:", token);

      if (!token) {
        console.error("Missing token. Redirecting to login.");
        navigate("/"); // Redirect to login if token is missing
        return;
      }

      const response = await fetch(`https://group-project-com229-backend-l17m.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched user data:", data);
      setUser(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setUser(null); // Handle error gracefully
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    const handleMediaChange = (e) => setIsNonMobileScreens(e.matches);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className={`profile-container ${isNonMobileScreens ? 'flex' : 'block'}`}>
        <div className="widget-container">
          {user.picturePath && (
            <UserWidget userId={userId} picturePath={user.picturePath} />
          )}
          <div className="spacer" />
          <FriendListWidget userId={userId} />
        </div>
        <div className={`main-content ${isNonMobileScreens ? 'flex' : 'block'}`}>
          <MyPostWidget picturePath={user.picturePath} />
          <div className="spacer" />
          <PostsWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
