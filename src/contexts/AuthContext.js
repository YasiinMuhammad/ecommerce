import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  function logIn(email, password, validate) {
    return auth.signInWithEmailAndPassword(email, password).then((auth) => {
      history.push("/");
    }).catch((error) => validate(error.message));
  }

  function signout() {
    return auth.signOut().then((auth) => {
      history.push("/");
    }).catch((error) => alert(error.message));
  }

  function registerAccount(email, password){
    return auth.createUserWithEmailAndPassword(email, password).then((auth)=>{
      if (auth) {
        history.push("/");
      }
    }).catch((error) => alert(error.message));
  }
  const value = {
    logIn,
    registerAccount,
    signout,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
