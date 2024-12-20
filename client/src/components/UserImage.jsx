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
        src={`${process.env.REACT_APP_API_URL}/assets/${image}`} 
      />
    </div>
  );
};

export default UserImage;
