import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import Friend from "components/Friend";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, [userId, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const styles = {
    widgetWrapper: {
      padding: "1rem",
      border: "1px solid #ddd",
      borderRadius: "0.75rem",
      backgroundColor: "#fff",
      marginBottom: "1rem",
    },
    heading: {
      color: "#333", // Replace with your preferred dark color
      fontSize: "1.25rem",
      fontWeight: "500",
      marginBottom: "1.5rem",
    },
    friendListContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
  };

  return (
    <div style={styles.widgetWrapper}>
      <div style={styles.heading}>Friend List</div>
      <div style={styles.friendListContainer}>
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendListWidget;
