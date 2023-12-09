import React, { useState,useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const useAuth = () => {
  const [authorization, setAuthorization] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState("");
  const [toogleVersion, setToogleVersion] = useState<boolean>(false);
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });
  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLog({ ...userLog, [name]: value });
  };

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const handleAuth = (user: string) => {
    setAuthorization(true);
    setCurrentUser(user);
  };

  return {
    authorization,
    userLog,
    currentUser,
    toogleVersion,
    handleAuth,
    handleUserInfo,
    login,
    setToogleVersion,
  };
};
export default useAuth;
