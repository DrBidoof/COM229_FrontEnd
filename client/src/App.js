import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode); // Get the current mode (e.g., "light" or "dark")
  const isAuth = Boolean(useSelector((state) => state.token)); // Check if the user is authenticated

  // Define styles for light and dark modes
  const appStyles = {
    app: {
      textAlign: "center",
      backgroundColor: mode === "dark" ? "#121212" : "#f0f0f0",
      color: mode === "dark" ? "#fff" : "#000",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif",
    },
    page: {
      padding: "20px",
      fontSize: "18px",
    },
    button: {
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={appStyles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage style={appStyles.page} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage style={appStyles.page} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
