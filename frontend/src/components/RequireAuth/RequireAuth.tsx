import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { TokenObtainPair } from "../../types/User";

export const RequireAuth = () => {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth)


  if (!isAuth) {
    return <Navigate to={"login"}/>
  }

  return (
    <Navigate to={"details"}/>
  )
};

