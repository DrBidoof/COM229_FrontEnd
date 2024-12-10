import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const PostsWidget = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6001/posts`, {
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
      const response = await fetch(`http://localhost:6001/posts/${postId}/like`, {
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
      const response = await fetch(`http://localhost:6001/friends/${friendId}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add friend");
      }

      alert("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("An error occurred while adding the friend.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>
              {post.firstName} {post.lastName}
            </h3>
            <p>{post.description}</p>
            {post.picturePath && (
              <img
                src={`http://localhost:6001${post.picturePath}`}
                alt="Post"
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              />
            )}
            {post.userID !== userId && (
              <button
                onClick={() => handleAddFriend(post.userID)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Add Friend
              </button>
            )}
            <button
              onClick={() => handleLike(post._id)}
              style={{
                padding: "5px 10px",
                backgroundColor: post.likes[userId] ? "#28a745" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {post.likes[userId] ? "Unlike" : "Like"} ({Object.keys(post.likes || {}).length})
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsWidget;
