import React, { useContext } from 'react';
import './BigButton.scss';

import { Loader } from '../Loader';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  text: string;
  onClick: (e: any) => void | Promise<void>;
};

export const BigButton: React.FC<Props> = React.memo(({ text, onClick }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <button type="submit" className="BigButton" onClick={onClick}>
      {isLoading ? <Loader /> : `${text}`}
    </button>
  );
});
