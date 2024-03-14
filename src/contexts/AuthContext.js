import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase"
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [Loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function signIn(email, password){
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }
  function signOut(){
    return auth.signOut();
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithFacebook
  };

  return (
    <AuthContext.Provider value={value}>
      {!Loading && children}
    </AuthContext.Provider>
  );
}