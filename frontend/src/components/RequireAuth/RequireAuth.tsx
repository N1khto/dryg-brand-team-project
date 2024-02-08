import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const RequireAuth = () => {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to={'login'} />;
  }

  return <Navigate to={'details'} />;
};
