import React from 'react';
import './SmallButton.scss';

import { Loader } from '../Loader';

type Props = {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
};

export const SmallButton: React.FC<Props> = React.memo(
  ({ text, onClick, isLoading = false, className = '' }) => {
    return (
      <button
        type="button"
        className={`SmallButton ${className}`}
        onClick={onClick}
      >
        {isLoading ? <Loader /> : text}
      </button>
    );
  }
);
