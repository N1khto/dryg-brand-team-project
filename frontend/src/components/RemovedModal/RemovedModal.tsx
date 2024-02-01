import { useEffect } from 'react';
import './RemovedModal.scss';

type Props = {
  setIsRemovedModalOpen: (value: boolean) => void,
}

export const RemovedModal: React.FC<Props> = ({setIsRemovedModalOpen}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemovedModalOpen(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="AddedModal">
      <div className="AddedModal__icon icon icon--favourites-white" />

      <div className="AddedModal__content">
        <span className="AddedModal__message">
          The item has been removed from the Wishlist.
        </span>
      </div>

      <button
        type="button"
        className="AddedModal__button"
        onClick={() => setIsRemovedModalOpen(false)}
      >
        <div className="icon icon--close-white" />
      </button>
    </div>
  );
};
