import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Login, TokenObtainPair, User } from '../types/User';
import { getToken, getUser, logout, refreshToken } from '../api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type State = {
  authUser: User | null,
  setAuthUser: (user: User | null) => void,
  token: string,
  setToken: (value: string) => void,
  isAuth: boolean,
  setIsAuth: (value: boolean) => void,
  isLoginModalOpen: boolean,
  setIsLoginModalOpen: (value: boolean) => void,
  userLogout: () => void,
  userLogin: (value: Login) => Promise<void>,
  isLoading: boolean,
};

export const AuthContext = React.createContext<State>({
  authUser: null,
  setAuthUser: () => {},
  token: '',
  setToken: () => {},
  isAuth: false,
  setIsAuth: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
  userLogout: () => {},
  userLogin: async () => {},
  isLoading: false,
});

interface Props {
  children: React.ReactNode,
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const access_token = Cookies.get('access_token');
  //   setIsAuth(!!access_token);
  //   if (access_token) {
  //     setToken(access_token)
  //   }
  // }, [isAuth]);

  useEffect(() => {
    const refresh_token = Cookies.get('refresh_token');
    
    if (refresh_token) {
      refreshToken({refresh: refresh_token})
        .then((data: TokenObtainPair) => {
          setToken(data.access)
          Cookies.set('refresh_token', data.refresh);
          Cookies.set('access_token', data.access);
          setIsAuth(true)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    if (isAuth) {
      getUser()
      .then((data) => {
        setAuthUser(data);
      })
      .catch((e) => {
        console.log('Get user error', e)
      })

    }

  }, [isAuth])



  const userLogin = useCallback((userCreds: Login) => {
    return getToken(userCreds)
      .then((data) => {
        Cookies.set('refresh_token', data.refresh);
        Cookies.set('access_token', data.access);
        setIsAuth(true);
        setToken(data.access);        
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
      })
  }, [])

  const userLogout = useCallback(() => {
    logout()
      .then(() => {
        setIsAuth(false);
        setToken('');
        setAuthUser(null);
        Cookies.set('refresh_token', '');
        Cookies.set('access_token', '');        
      })
    
  }, [])
  
  const value = useMemo(() => ({
    token,
    setToken,
    authUser,
    setAuthUser,
    isAuth,
    setIsAuth,
    isLoginModalOpen,
    setIsLoginModalOpen,
    userLogout,
    userLogin,
    isLoading,
  }), [token, authUser, isAuth, isLoginModalOpen, userLogout, userLogin, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
