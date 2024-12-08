import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state"; 


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://group-project-com229-backend-l17m.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="friend-container">
      <div className="friend-info" onClick={() => {
        navigate(`/profile/${friendId}`);
        navigate(0);
      }}>
        <UserImage image={userPicturePath} size="55px" />
        <div className="friend-details">
          <h5>{name}</h5>
          <p>{subtitle}</p>
        </div>
      </div>
      <button className="friend-action" onClick={() => patchFriend()}>
        {isFriend ? (
          <span className="remove-friend">Remove Friend</span>
        ) : (
          <span className="add-friend">Add Friend</span>
        )}
      </button>
    </div>
  );
};

export default Friend;
