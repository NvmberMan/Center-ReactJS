import React, { useRef, useState } from "react";
import "../StylistComponent/auth.css";
import GoogleIcon from "../Images/Google.png";
import FacebookIcon from "../Images/Facebook.png";
import Navbar from "../Components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import WithAuthRedirect from "../Components/WithAuthRedirect";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const [error, setError] = useState("");

  const changeRoutes = (url) => {
    window.location = url;
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      window.location = "/";
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (error.code === "auth/invalid-credential") {
        setError("Incorrect username or password. Please try again.");
      } else {
        // Menampilkan pesan kesalahan lain jika diperlukan
        setError("An error occurred. Please try again later.");
      }
      console.log(error);
    }
  }

  async function handleSignInGoogle() {
    signInWithGoogle()
      .then((result) => {
        // Autentikasi berhasil
        console.log("Signed in with Google:", result.user);
        // Redirect atau tindakan lain yang diperlukan setelah berhasil masuk
      })
      .catch((error) => {
        // Menangani error saat autentikasi
        console.error("Error signing in with Google:", error);
      });
  }
  async function handleSignInFacebook() {
    try {
      await signInWithFacebook();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setError("Please keep the authentication popup open until the process is completed.");
      } else {
        // Menangani error lainnya jika diperlukan
        setError("An error occurred. Please try again later.");
      }
      console.error("Error signing in with Facebook:", error);
    }
  }
  


  return (
    <div className="container">
      {<Navbar />}
      <div className="content auth-page">
        <form>
          <div className="title">
            <h1>Login To Your Account</h1>
            <p>Login using social networks</p>
          </div>
          <div className="auth-icon">
            <img onClick={handleSignInGoogle} src={GoogleIcon} alt="" />
            <img onClick={handleSignInFacebook} src={FacebookIcon} alt="" />
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
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div className="input-form">
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="input-form">
            <a className="forgot" href="/">
              Forgot Your Password
            </a>
          </div>
          <div className="input-form button">
            <button
              type="button"
              onClick={(e) => handleLogin(e)}
              className="submit"
            >
              SIGN IN
            </button>
            <button
              className="account"
              type="button"
              onClick={() => changeRoutes("/register")}
            >
              Need Account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WithAuthRedirect(Login);
