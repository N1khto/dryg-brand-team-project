import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Login, TokenObtainPair, User, UserRegister } from '../types/User';
import { getToken, getUser, logout, refreshToken, registerUser } from '../api/user';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export interface Error {
  Error: {
    [key:string]: string[]
  }
}

type State = {
  authUser: User | null,
  setAuthUser: (user: User | null) => void,
  isAuth: boolean,
  setIsAuth: (value: boolean) => void,
  isLoginModalOpen: boolean,
  setIsLoginModalOpen: (value: boolean) => void,
  registerNewUser: (newUser: UserRegister) => Promise<void>,
  userLogout: () => void,
  userLogin: (value: Login) => Promise<void>,
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
};

export const AuthContext = React.createContext<State>({
  authUser: null,
  setAuthUser: () => {},
  isAuth: false,
  setIsAuth: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
  userLogout: () => {},
  userLogin: async () => {},
  registerNewUser: async () => {},
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh_token = Cookies.get('refresh_token');
    
    if (refresh_token) {
      refreshToken({refresh: refresh_token})
        .then((data: TokenObtainPair) => {
          Cookies.set('refresh_token', data.refresh);
          Cookies.set('access_token', data.access);
          setIsAuth(true)
        })
        .catch((e) => {
          console.log(e)
          throw new Error(e)
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
    setIsLoading(true);
    return getToken(userCreds)
      .then((data) => {
        Cookies.set('refresh_token', data.refresh);
        Cookies.set('access_token', data.access);
        setIsAuth(true);
      })
      .catch((e) => {
        throw new ErrorEvent(e);
        
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const registerNewUser = useCallback((newUser: UserRegister) => {
    setIsLoading(true);

    return registerUser(newUser)
    .then((data) => {
      setAuthUser({        
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        region: '',
        city: '',
        nova_post_department: 0,
        phone_number: '',        
      })

      getToken({email: newUser.email, password: newUser.password})
        .then((data) => {
          Cookies.set('refresh_token', data.refresh);
          Cookies.set('access_token', data.access);
          setIsAuth(true);
          navigate('/account');        
        })
        .catch((e) => {
          console.error(e)
        })
      
    })
    .catch((e) => {
      throw new Error(e)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [])

  const userLogout = useCallback(() => {
    logout()
      .then(() => {
        setIsAuth(false);
        setAuthUser(null);
        Cookies.set('refresh_token', '');
        Cookies.set('access_token', '');        
      })
    
  }, [])
  
  const value = useMemo(() => ({
    authUser,
    setAuthUser,
    isAuth,
    setIsAuth,
    isLoginModalOpen,
    setIsLoginModalOpen,
    userLogout,
    userLogin,
    registerNewUser,
    isLoading,
    setIsLoading,
  }), [authUser, isAuth, isLoginModalOpen, userLogout, userLogin, isLoading, registerNewUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
