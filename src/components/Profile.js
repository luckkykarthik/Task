// Profile.js
import React, { useEffect, useState } from 'react';
import './profile.css';
import Service from './Service';

const Profile = () => {
  const [profileData, setProfileData] = useState({ id: '', name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Service.getProfile();
        setProfileData(response);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card profile-card">
        <div className="card-body">
          <h5 className="card-title mb-4">User Profile</h5>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>ID:</strong>
            </div>
            <div className="col-md-9">{profileData.id}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Name:</strong>
            </div>
            <div className="col-md-9">{profileData.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">{profileData.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
