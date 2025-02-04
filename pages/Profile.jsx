import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // docRef will find the data from db
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("no user doc found");
          }
        } else {
          console.log("no user logged in");
        }
      } catch (error) {
        console.log("Something wrong at profile: ", error);
      }
    };
    fetchData();
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-name">Profile Owner</h1>
            <p className="profile-username">{userData.username}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{userData.email}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Bio</span>
              <span className="detail-value">N/A</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="logout-button" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>No user data avialable</div>
      )}
    </div>
  );
};

export default Profile;
