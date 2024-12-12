import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state"; // Ensure this action is imported
import "./PostsWidget.css";

const PostsWidget = ({ userId: propUserId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const loggedInUserId = useSelector((state) => state.auth.user?.id || state.auth.user?._id);
  const friends = useSelector((state) => state.auth.user?.friends || []); // Get friends from Redux
  const dispatch = useDispatch(); // Add dispatch

  const isProfilePage = Boolean(propUserId); // If `propUserId` exists, we're on the profile page
  const userId = isProfilePage ? propUserId : loggedInUserId; // Use `propUserId` if on profile page, otherwise use logged-in user's ID

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = isProfilePage
        ? `${process.env.REACT_APP_API_URL}/posts/${userId}/posts` // Fetch posts for the specific user (Profile Page)
        : `${process.env.REACT_APP_API_URL}/posts`; // Fetch all posts (Home Page)

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(isProfilePage ? data.userPosts || [] : data.allPosts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [token, userId, isProfilePage]);

  const isFriend = (userId) => friends.some((friend) => friend._id === userId);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }), // Sending userId in the request body
      });
  
      if (!response.ok) {
        throw new Error("Failed to like/unlike post");
      }
  
      // Extract the updated post from the backend response
      const { updatedPost } = await response.json();
  
      // Update the local posts state with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post // Replace the updated post in the state
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error.message);
      alert("Failed to toggle like. Please try again.");
    }
  };
  
  
  
  

  const handleAddFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${loggedInUserId}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to add friend: ${response.status} - ${errorDetails}`);
      }
  
      const updatedFriend = await response.json();
  
      // Ensure the friend object has all necessary fields
      const completeFriend = {
        _id: updatedFriend._id,
        firstName: updatedFriend.firstName || "Unknown",
        lastName: updatedFriend.lastName || "",
        picturePath: updatedFriend.picturePath || "/assets/image.png",
        occupation: updatedFriend.occupation || "Unknown",
      };
  
      // Fetch the updated friends list from the server
      const friendsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${loggedInUserId}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (friendsResponse.ok) {
        const friendsList = await friendsResponse.json();
        dispatch(setFriends({ friends: friendsList }));
      } else {
        console.error("Failed to fetch updated friends list");
        dispatch(setFriends({ friends: [...friends, completeFriend] }));
      }
  
      alert("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error.message);
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
                src={
                  post.userPicturePath
                    ? `${process.env.REACT_APP_API_URL}${post.userPicturePath}`
                    : "/assets/image.png"
                }
                alt="Profile"
                className="profile-picture"
              />
              <div>
                <h3 className="post-author">{`${post.firstName} ${post.lastName}`}</h3>
                <p className="post-location">Location: {post.location || "Unknown"}</p>
              </div>
            </div>
            <p className="post-description">{post.description}</p>
            {post.picturePath && (
              <img
                src={`${process.env.REACT_APP_API_URL}${post.picturePath}`}
                alt="Post"
                className="post-image"
              />
            )}
            <div className="post-actions">
              {post.userID !== loggedInUserId && !isFriend(post.userID) && (
                <button className="add-friend-btn" onClick={() => handleAddFriend(post.userID)}>
                  Add Friend
                </button>
              )}
              <button
                className={`like-btn ${post.likes[loggedInUserId] ? "liked" : ""}`}
                onClick={() => handleLike(post._id)}
              >
                {post.likes[loggedInUserId] ? "Unlike" : "Like"} ({Object.keys(post.likes || {}).length})
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsWidget;
