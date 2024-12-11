import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import "./PostsWidget.css";

const PostsWidget = ({ userId, fetchFriends }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.allPosts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: {
                  ...post.likes,
                  [userId]: !post.likes[userId],
                },
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add friend");
      }

      alert("Friend added successfully!");
      
      // Update friends list in FriendListWidget
      if (fetchFriends) {
        fetchFriends(); // Trigger fetchFriends to update FriendListWidget
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            <div className="post-header">
              <img
                src={ "/assets/Image.png" }// Replace with user profile picture if available
                alt="Profile"
                className="profile-picture"
              />
              <div>
                <h3 className="post-author">{post.firstName} {post.lastName}</h3>
                <p className="post-location">Location: {post.location || "Unknown"}</p>
              </div>
            </div>
            <p className="post-description">{post.description}</p>
            {post.picturePath && (
              <img
                src={`http://localhost:6001${post.picturePath}`}
                alt="Post"
                className="post-image"
              />
            )}
            <div className="post-actions">
              {post.userID !== userId && (
                <button className="add-friend-btn" onClick={() => handleAddFriend(post.userID)}>
                  Add Friend
                </button>
              )}
              <button
                className={`like-btn ${post.likes[userId] ? "liked" : ""}`}
                onClick={() => handleLike(post._id)}
              >
                {post.likes[userId] ? "Unlike" : "Like"} ({Object.keys(post.likes || {}).length})
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsWidget;