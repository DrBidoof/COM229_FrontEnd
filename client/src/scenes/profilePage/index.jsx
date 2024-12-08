import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [isNonMobileScreens, setIsNonMobileScreens] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  // Fetch user details
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:6001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      setUser(null); // Handle error case
    }
  };

  // Handle responsive layout
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
