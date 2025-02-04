import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  // state hooks
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);
    try {
      const { email, password } = userInfo; //define email and pass
      const singUpUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = singUpUser.user;
      // console.log("user registered successfully", user);

      // this is for store data 
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: userInfo.username,
      });

      navigate("/login");
      console.log("user registered successfully", user);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
