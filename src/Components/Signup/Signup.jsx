
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Logo from '../../olx-logo.png';
import toast, { Toaster } from "react-hot-toast";
import './Signup.css';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, signUp } = useContext(AuthContext);


  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email.trim()) {
      newErrors.Email = "Email is required";
    } else if (!emailRegex.test(Email)) {
      newErrors.Email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Password validation
    if (!Password) {
      newErrors.Password = "Password is required";
    } else if (Password.length < 6) {
      newErrors.Password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // If validation fails, stop form submission
    }
  
    setLoading(true);
    let res = await signUp(userName, Email, phone, Password);
    
    if (res.userExits) {
      setLoading(false);
      toast.error("User already exists");
    } else if (res.success) {
      toast.success("Signup successful");
      navigate('/'); // Redirect on successful signup
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <Toaster />

        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
          />
          {errors.userName && <p className="error">{errors.userName}</p>} {/* Username error */}

          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.Email && <p className="error">{errors.Email}</p>} {/* Email error */}

          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>} {/* Phone error */}

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          {errors.Password && <p className="error">{errors.Password}</p>} {/* Password error */}

          <button type="submit">
            Signup
            {loading && <div className="spinner"></div>}
          </button>
        </form>

        <Link to="/login">Already have an account</Link>

      </div>
    </div>
  );
}
