import React from "react";

const AdvertWidget = () => {
  const styles = {
    widgetWrapper: {
      padding: "1rem",
      border: "1px solid #ddd",
      borderRadius: "0.75rem",
      backgroundColor: "#fff",
      marginBottom: "1rem",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    heading: {
      color: "#333", // Replace this with your desired dark color
      fontSize: "1.25rem",
      fontWeight: "500",
    },
    subHeading: {
      color: "#666", // Replace this with your desired medium color
      fontSize: "0.875rem",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "0.75rem",
      margin: "0.75rem 0",
    },
    mainText: {
      color: "#444", // Replace this with your desired main color
    },
    description: {
      color: "#666", // Replace this with your desired medium color
      margin: "0.5rem 0",
      fontSize: "0.875rem",
    },
  };

  return (
    <div style={styles.widgetWrapper}>
      <div style={styles.flexBetween}>
        <span style={styles.heading}>Sponsored</span>
        <span style={styles.subHeading}>Create Ad</span>
      </div>
      <img
        style={styles.image}
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
      />
      <div style={styles.flexBetween}>
        <span style={styles.mainText}>MikaCosmetics</span>
        <span style={styles.subHeading}>mikacosmetics.com</span>
      </div>
      <p style={styles.description}>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </div>
  );
};

export default AdvertWidget;
