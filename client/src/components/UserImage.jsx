import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  // Inline styles
  const imageStyle = {
    objectFit: "cover", 
    borderRadius: "50%", 
    width: size,
    height: size,
  };

  const containerStyle = {
    width: size,
    height: size,
  };

  return (
    <div style={containerStyle}>
      <img
        style={imageStyle}
        alt="user"
        src={`$https://group-project-com229-backend.onrender.com/assets/${image}`} 
      />
    </div>
  );
};

export default UserImage;
