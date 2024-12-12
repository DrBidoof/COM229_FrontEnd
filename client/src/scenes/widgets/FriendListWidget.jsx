import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import "./FriendListWidget.css";

const FriendListWidget = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user?.friends || []); // Get friends from Redux

  // Fetch friends function
  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data })); // Update Redux state
      setError(null);
    } catch (error) {
      console.error("Error fetching friends:", error);
      setError("Failed to load friends. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userId, token, dispatch]);

  // Remove friend function
  const handleRemoveFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/${friendId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove friend");
      }

      // Refresh the friend list
      fetchFriends();
    } catch (error) {
      console.error("Error removing friend:", error);
      alert("Failed to remove friend. Please try again.");
    }
  };

  useEffect(() => {
    fetchFriends(); // Fetch friends on component mount
  }, [fetchFriends]);

  if (loading) return <p>Loading friends...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="friend-widget">
      <h2 className="widget-title">Friend List</h2>
      {friends.length === 0 ? (
        <p className="no-friends">No friends found.</p>
      ) : (
        <ul className="friend-list">
          {friends.map((friend) => (
            <div className="friend-card" key={friend._id}>
              <div className="friend-info">
                <img
                  src={`${process.env.REACT_APP_API_URL}${friend.picturePath}` || "/assets/image.png"}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  className="friend-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/image.png";
                  }}
                />
                <div className="friend-details">
                  <p className="friend-name">{`${friend.firstName} ${friend.lastName}`}</p>
                  <p className="friend-subtitle">{friend.occupation || "Unknown"}</p>
                </div>
              </div>
              <button
                className="friend-remove-btn"
                onClick={() => handleRemoveFriend(friend._id)}
                title="Remove Friend"
              >
                <img
                  src="/assets/icon-removefriend.webp" // Path to your icon in the public/assets folder
                  alt="Remove Friend"
                />
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendListWidget;
