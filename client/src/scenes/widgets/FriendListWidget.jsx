import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch friends: ${response.status}`);
      }

      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchFriends();
    }
  }, [userId, token]);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div>
      <h2>Friends List</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend._id} style={{ marginBottom: "10px", listStyleType: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={friend.picturePath || "https://via.placeholder.com/50"}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {friend.firstName} {friend.lastName}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>{friend.location || "Unknown Location"}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendListWidget;
