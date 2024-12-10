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
  <div style={{ width: "100%", backgroundColor: "#f0f0f0", paddingTop: "120px"}}>
    {/* Header */}
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#e0e0e0",
       
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       {/* Header Content Wrapper */}
       <div
          style={{
            width: isNonMobileScreens ? "50%" : "93%", 
            display: "flex",
            alignItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
      >
        <img
          src="/assets/AppLogo.png"
          alt="Logo"
          style={{ width: "100px", height: "100px" }}
        />
        <h1 style={{ fontWeight: "bold",
    fontSize: "2rem",
    color: "#1e88e5",
    animation: "fadeIn 1s ease-in-out",
    justifyContent: "center", 
            textAlign: "center", 
     }}>
          Snapzy
        </h1>
      </div>
    </div>

    {/* Form Section */}
    <div
      style={{
        width: isNonMobileScreens ? "50%" : "93%",
        padding: "2rem",
        margin: "2rem auto",
        borderRadius: "1.5rem",
        backgroundColor: "#e0e0e0",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Every Moment Deserves to be Shared
      </h2>
      <Form />
    </div>
  </div>
);
};

export default LoginPage;
