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
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      if (!token) {
        console.error("Missing token. Redirecting to login.");
        navigate("/");
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
      setUser(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

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
            <UserWidget user={user} />
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