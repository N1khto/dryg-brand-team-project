import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddedModal.scss';

interface Props {
  setIsAddedModalOpen: (value: boolean) => void;
}

export const AddedModal: React.FC<Props> = React.memo(
  ({ setIsAddedModalOpen }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsAddedModalOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }, [setIsAddedModalOpen]);

    return (
      <div className="AddedModal">
        <div className="AddedModal__icon icon icon--favourites-white" />

        <div className="AddedModal__content">
          <span className="AddedModal__message">
            The item has been added to the Wishlist
          </span>

          <Link
            to="/account/wishlist"
            className="AddedModal__link"
            onClick={() => setIsAddedModalOpen(false)}
          >
            View the Wishlist
          </Link>
        </div>

        <button
          type="button"
          className="AddedModal__button"
          onClick={() => setIsAddedModalOpen(false)}
        >
          <div className="icon icon--close-white" />
        </button>
      </div>
    );
  }
);
