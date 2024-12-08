import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userWidget.css";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  // Memoize the getUser function
  const getUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:6001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, token]); // Memoize dependencies

  useEffect(() => {
    if (!userId) {
      console.error("UserWidget received undefined userId. Skipping fetch.");
      return;
    }
    getUser();
  }, [getUser, userId]); // Use the memoized function as a dependency

  if (!user) {
    return null; // Render nothing until user data is available
  }

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <div className="widget">
      {/* First Row */}
      <div className="user-header" onClick={() => navigate(`/profile/${userId}`)}>
        <div className="user-info">
          <img src={picturePath} alt="user profile" className="user-image" />
          <div>
            <h4 className="user-name">{firstName} {lastName}</h4>
            <p className="user-friends">{friends?.length || 0} friends</p>
          </div>
        </div>
        <button className="manage-account">Manage</button>
      </div>

      <hr />

      {/* Second Row */}
      <div className="user-details">
        <div className="user-location">
          <span className="icon">📍</span>
          <p>{location || "Location not provided"}</p>
        </div>
        <div className="user-occupation">
          <span className="icon">💼</span>
          <p>{occupation || "Occupation not provided"}</p>
        </div>
      </div>

      <hr />

      {/* Third Row */}
      <div className="user-stats">
        <div className="user-stat">
          <p>Who's viewed your profile</p>
          <p className="stat-value">{viewedProfile || 0}</p>
        </div>
        <div className="user-stat">
          <p>Impressions of your post</p>
          <p className="stat-value">{impressions || 0}</p>
        </div>
      </div>

      <hr />

      {/* Fourth Row */}
      <div className="user-social">
        <h5>Social Profiles</h5>
        <div className="social-profile">
          <div className="social-info">
            <img src="../assets/twitter.png" alt="Twitter" className="social-image" />
            <div>
              <p className="social-name">Twitter</p>
              <p className="social-type">Social Network</p>
            </div>
          </div>
          <button className="edit-social">Edit</button>
        </div>
        <div className="social-profile">
          <div className="social-info">
            <img src="../assets/linkedin.png" alt="LinkedIn" className="social-image" />
            <div>
              <p className="social-name">LinkedIn</p>
              <p className="social-type">Network Platform</p>
            </div>
          </div>
          <button className="edit-social">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
