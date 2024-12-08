import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import "./HomePage.css"

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const { _id, picturePath } = user || {};

  if (!user) return <div>Loading...</div>;

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
