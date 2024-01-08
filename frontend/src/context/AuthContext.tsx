import React, { useMemo, useState } from 'react';

type State = {
  isAuth: boolean,
  setIsAuth: (value: boolean) => void,
  isLoginModalOpen: boolean,
  setIsLoginModalOpen: (value: boolean) => void,
};

export const AuthContext = React.createContext<State>({
  isAuth: false,
  setIsAuth: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const value = useMemo(() => ({
    isAuth,
    setIsAuth,
    isLoginModalOpen,
    setIsLoginModalOpen,
  }), [isAuth, isLoginModalOpen]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
