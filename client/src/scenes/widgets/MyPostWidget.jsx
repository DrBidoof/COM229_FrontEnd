import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyPostWidget = ({ picturePath }) => {
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!description.trim()) {
      alert("Post description cannot be empty.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Post created successfully!");
        setDescription("");
        setPicture(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.message || "Unknown error"}`);
      }
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
