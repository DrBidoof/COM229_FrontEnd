import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import './ProfilePage.css'; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [isNonMobileScreens, setIsNonMobileScreens] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsNonMobileScreens(window.matchMedia("(min-width: 1000px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return <div>Loading...</div>;


  return (
    <div>
      <Navbar />
      <div className={`profile-container ${isNonMobileScreens ? 'flex' : 'block'}`}>
        <div className="widget-container">
          <UserWidget userId={userId} picturePath={user.picturePath} />
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
