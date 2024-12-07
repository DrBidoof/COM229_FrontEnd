import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.auth.mode); // Access the mode from auth slice
  const token = useSelector((state) => state.auth.token); // Access the token from auth slice
  const isAuth = Boolean(token); // Check if the user is authenticated

  console.log("Redux state:", { mode, token, isAuth }); // Debug Redux state

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
  };

  return (
    <div style={appStyles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
