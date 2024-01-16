import './LoginModal.scss';
import { useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoginForm } from '../LoginForm/LoginForm';

export const LoginModal: React.FC = () => {
  const { setIsLoginModalOpen } = useContext(AuthContext);

  return (
    <div className="LoginModal">
      <div className="LoginModal__container">
        <div className="LoginModal__header">
          <h2 className="LoginModal__title">Login</h2>
          <button
            type="button"
            className="LoginModal__button"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <div className="icon icon--close" />
          </button>
        </div>

        <LoginForm />
      </div>
    </div>
  )
};
