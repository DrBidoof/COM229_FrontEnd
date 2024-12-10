import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import "./HomePage.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  console.log("Redux State - User:", user);
  console.log("Redux State - Token:", token);

  if (!user) {
    return (
      <div>
        <Navbar />
        <p>Loading user data...</p>
      </div>
    );
  }

  // Map `id` to `_id` for consistency
  const { id, picturePath } = user;
  const _id = id;

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <div className="widget">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="main-content">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div className="widget">
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
