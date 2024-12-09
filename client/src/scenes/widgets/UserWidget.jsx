import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userWidget.css";

const UserWidget = ({ user }) => {
  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;
  const navigate = useNavigate();

  return (
    <div className="widget">
      {/* First Row */}
      <div className="user-header" onClick={() => navigate(`/profile/${user.id}`)}>
        <div className="user-info">
          <img src={user.picturePath} alt="user profile" className="user-image" />
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
