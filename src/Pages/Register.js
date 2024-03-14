import React, { useRef, useState } from "react";
import "../StylistComponent/auth.css";
import GoogleIcon from "../Images/Google.png";
import FacebookIcon from "../Images/Facebook.png";
import Navbar from "../Components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import WithAuthRedirect from "../Components/WithAuthRedirect";

function Register() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const [error, setError] = useState('');

  const changeRoutes = (url) => {
    window.location = url;
  };

  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      window.location = "/login";
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters");
      } else {
        // Menampilkan pesan kesalahan lain jika diperlukan
        setError("An error occurred. Please try again later.");
      }
      // console.log(error)
    }
  }

  return (
    <div className="container">
      {<Navbar />}
      <div className="content auth-page">
        <form>
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
          <div className={`alert-form ${error ? "" : "hidden"}`}>
            <p>{error ? error : ""}</p>
          </div>
          <div className="input-form">
            <input ref={emailRef} type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-form">
            <input ref={passwordRef} type="password" id="password" placeholder="Password" />
          </div>
          <div className="input-form">
            <input
              ref={passwordConfirmRef}
              type="password"
              id="password-confirm"
              placeholder="Confirm Password"
            />
          </div>
          <div className="input-form check">
            <input type="checkbox" />
            <p>By signing in or signing up, you agree with our Privacy Policy</p>
          </div>
          <div className="input-form button">
            <button type="button" onClick={(e) => handleSubmit(e)} className="submit">
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

export default WithAuthRedirect(Register);;
