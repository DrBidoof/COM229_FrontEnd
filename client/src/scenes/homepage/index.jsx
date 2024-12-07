import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import "./HomePage.css"; 

const HomePage = () => {
  const [isNonMobileScreens, setIsNonMobileScreens] = React.useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsNonMobileScreens(window.matchMedia("(min-width: 1000px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = useSelector((state) => state.auth.user); 
  const token = useSelector((state) => state.auth.token);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { _id, picturePath } = user;

  return (
    <div className="homepage">
      <Navbar />
      <div className="homepage-container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <UserWidget userId={_id} picturePath={picturePath} />
          <AdvertWidget />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>

        {/* Right Sidebar */}
        {isNonMobileScreens && (
          <div className="sidebar">
            <FriendListWidget userId={_id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
