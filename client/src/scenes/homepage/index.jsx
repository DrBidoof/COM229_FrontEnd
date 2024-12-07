import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  // Responsive screen check
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

  // Redux state selectors
  const user = useSelector((state) => state.auth.user); // Update path as per state structure
  const token = useSelector((state) => state.auth.token);

  console.log("Token:", token);

  // Handle loading state
  if (!user) {
    return <div>Loading...</div>; // A placeholder until user data is available
  }

  const { _id, picturePath } = user;

  return (
    <div>
      <Navbar />
      <div className="navbar-container">
        <div className="widget-container">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="main-content">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        {isNonMobileScreens && (
          <div className="widget-container">
            <AdvertWidget />
            <div className="advert-container" />
            <FriendListWidget userId={_id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
