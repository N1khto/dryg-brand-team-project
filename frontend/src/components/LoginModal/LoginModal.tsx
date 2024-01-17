import './LoginModal.scss';
import { LoginForm } from '../LoginForm/LoginForm';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { useEffect } from 'react';

type Props = {
  onClose: (value: boolean) => void,
}


const LoginModal: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  }, []);

  return (
      <div className="LoginModal">
        <div className="LoginModal__header">
          <h2 className="LoginModal__title">Login</h2>
          <button
            type="button"
            className="LoginModal__button"
            onClick={() => onClose(false)}
          >
            <div className="icon icon--close" />
          </button>
        </div>

        <LoginForm />
      </div>
  )
};

export default ModalWrapper(LoginModal);
