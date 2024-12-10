import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyPostWidget = ({ onPostCreated }) => {
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  console.log("Redux User:", user); // Debugging
  const userId = user?._id || user?.id; // Use appropriate field
  

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!description.trim()) {
      alert("Post description cannot be empty.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("userID", userId); // Adjust field name if required
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      // Debugging FormData
      console.log("Posting data:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await fetch(`http://localhost:6001/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the backend requires this
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.message || "Unknown error"}`);
        console.error("Error response:", errorData);
        return;
      }

      alert("Post created successfully!");
      setDescription("");
      setPicture(null);
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create a Post</h2>
      <textarea
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{
          width: "100%",
          height: "100px",
          marginBottom: "10px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        disabled={loading}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
        style={{
          marginBottom: "10px",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        disabled={loading}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default MyPostWidget;
