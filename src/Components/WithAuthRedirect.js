import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function WithAuthRedirect(WrappedComponent) {
  return function WithAuthRedirect(props) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    if (currentUser) {
      // Pengguna sudah login, alihkan ke halaman beranda
      window.location = "/"
      return null; // Return null agar komponen tidak dirender
    }

    // Pengguna belum login, render komponen yang dibungkus
    return <WrappedComponent {...props} />;
  };
}

export default WithAuthRedirect;
