import React from "react";
import "../StylistComponent/auth.css";
import GoogleIcon from "../Images/Google.png";
import FacebookIcon from "../Images/Facebook.png";
import Navbar from "../Components/Navbar";

function Register() {
  const changeRoutes = (url) => {
    window.location = url;
  };

  return (
    <div className="container">
      {<Navbar />}
      <div className="content auth-page">
        <form onSubmit="">
          <div className="title">
            <h1>Create Your Account</h1>
            <p>Login using social networks</p>
          </div>
          <div className="auth-icon">
            <img src={GoogleIcon} alt="" />
            <img src={FacebookIcon} alt="" />
          </div>
          <div className="line-border">
            <div className="line"></div>
            <p>Or</p>
            <div className="line"></div>
          </div>
          <div className="alert-form danger hidden">
            <p>Invalid username or password</p>
          </div>
          <div className="input-form">
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-form">
            <input type="text" id="email" placeholder="Username" />
          </div>
          <div className="input-form">
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input-form">
            <input
              type="password"
              id="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="input-form check">
            <input type="checkbox" />
            <p>By signing in or signing up, you agree with our Privacy Policy</p>
          </div>
          <div className="input-form button">
            <button type="submit" className="submit">
              SIGN UP
            </button>
            <button
              className="account"
              type="button"
              onClick={() => changeRoutes("/login")}
            >
              Have Account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
