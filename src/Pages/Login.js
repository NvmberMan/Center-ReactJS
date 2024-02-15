import React from "react";
import "../StylistComponent/auth.css";
import GoogleIcon from "../Images/Google.png";
import FacebookIcon from "../Images/Facebook.png";
import Navbar from "../Components/Navbar";

function Login() {

  const changeRoutes = (url) => {
    window.location = url
  };

  return (
    <div className="container">
      {<Navbar />}
      <div className="content auth-page">
        <form onSubmit="">
          <div className="title">
            <h1>Login To Your Account</h1>
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
            <input type="email" id="email" placeholder="Email or Username" />
          </div>
          <div className="input-form">
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input-form">
            <a className="forgot" href="/">
              Forgot Your Password
            </a>
          </div>
          <div className="input-form button">
            <button type="submit" className="submit">
              SIGN IN
            </button>
            <button className="account" type="button" onClick={() => changeRoutes("/register")}>Need Account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
