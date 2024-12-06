//will have react components for navigation bar
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;
    const [isNonMobileScreens, setIsNonMobileScreens] = useState(window.innerWidth >= 1000);

    useEffect(() => {
      const handleResize = () => {
        setIsNonMobileScreens(window.innerWidth >= 1000);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={styles.flexBetween}>
          <div style={styles.navContent}>
            <h1
              style={styles.logo}
              onClick={() => navigate("/home")}
            >
              Sociopedia
            </h1>
            {isNonMobileScreens && (
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search..."
                  style={styles.inputBase}
                />
                <button style={styles.iconButton}>🔍</button>
              </div>
            )}
          </div>
    
          {/* DESKTOP NAV */}
          {isNonMobileScreens ? (
            <div style={styles.desktopNav}>
              <button onClick={() => dispatch(setMode())} style={styles.iconButton}>
                {document.body.classList.contains("dark") ? "Dark Mode" : "Light Mode"}
                </button>
          <span style={styles.icon}>💬</span>
          <span style={styles.icon}>🔔</span>
          <span style={styles.icon}>❓</span>
          <div style={styles.formControl}>
          <select
  style={styles.select}
  onChange={(e) => {
    if (e.target.value === "logout") {
      dispatch(setLogout());
    }
  }}
>
  <option value="fullName">{fullName}</option>
  <option value="logout">Log Out</option>
</select>

          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          style={styles.iconButton}
        >
          ☰
        </button>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <div style={styles.mobileNav}>
          <div style={styles.closeButtonContainer}>
            <button
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              style={styles.iconButton}
            >
              ❌
            </button>
          </div>

          <div style={styles.menuItems}>
            <button
              onClick={() => dispatch(setMode())}
              style={styles.iconButton}
            >
              {document.body.classList.contains("dark") ? "Dark Mode" : "Light Mode"}
            </button>
            <span style={styles.icon}>💬</span>
            <span style={styles.icon}>🔔</span>
            <span style={styles.icon}>❓</span>
            <div style={styles.formControl}>
              <select style={styles.select} value={fullName} onChange={() => {}}>
                <option value={fullName}>{fullName}</option>
                <option onClick={() => dispatch(setLogout())}>Log Out</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 6%",
    backgroundColor: "#f0f0f0", 
  },
  navContent: {
    display: "flex",
    gap: "1.75rem",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#1976d2",
    cursor: "pointer",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: "#e0e0e0",
    borderRadius: "9px",
    padding: "0.1rem 1.5rem",
  },
  inputBase: {
    border: "none",
    outline: "none",
    background: "none",
  },
  iconButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  desktopNav: {
    display: "flex",
    gap: "2rem",
  },
  icon: {
    fontSize: "25px",
  },
  formControl: {
    backgroundColor: "#e0e0e0",
    borderRadius: "0.25rem",
    padding: "0.25rem 1rem",
  },
  select: {
    border: "none",
    outline: "none",
    background: "none",
    width: "150px",
  },
  mobileNav: {
    position: "fixed",
    right: "0",
    bottom: "0",
    height: "100%",
    zIndex: 10,
    maxWidth: "500px",
    minWidth: "300px",
    backgroundColor: "#fff",
  },
  closeButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
  },

}
export default Navbar;