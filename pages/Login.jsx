import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const navigate = useNavigate("/profile");
  // state hooks
  const [userInfo, setUserInfo] = useState({
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
    const { email, password } = userInfo; //define email, password
    try {
      const singInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = singInUser;
      console.log("user logged in successfully", user);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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

        <div className="register-link">
          Don't have an account? <Link to="/">Register</Link>
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
