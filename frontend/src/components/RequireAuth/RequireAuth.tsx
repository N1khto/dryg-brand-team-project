import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { log } from "console";

export const RequireAuth = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log(isAuth)

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    console.log(access_token);
    
    setIsAuth(!!access_token);
  }, [isAuth]);

  if (!isAuth) {
    return <Navigate to={"login"}/>
  }

  return (
    <Navigate to={"details"}/>
  )
};

