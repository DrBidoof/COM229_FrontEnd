import React from "react";
import Form from "./Form";

const LoginPage = () => {
  const [isNonMobileScreens, setIsNonMobileScreens] = React.useState(window.innerWidth >= 1000);

React.useEffect(() => {
  const handleResize = () => {
    setIsNonMobileScreens(window.innerWidth >= 1000);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <div style={{ width: "100%", padding: "1rem 6%", textAlign: "center", backgroundColor: "#f0f0f0" }}>
      <div style={{ backgroundColor: "#e0e0e0", padding: "1rem" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "32px", color: "#1976d2" }}>
         Snapzy
        </h1>
      </div>

      <div
        style={{
          width: isNonMobileScreens ? "50%" : "93%",
          padding: "2rem",
          margin: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: "#e0e0e0",
        }}
      >
        <h2 style={{ fontWeight: 500, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Every Moment Deserves to be Shared

        </h2>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
