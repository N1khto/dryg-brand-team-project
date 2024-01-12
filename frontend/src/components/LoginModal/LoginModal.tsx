import { Link } from 'react-router-dom';
import './LoginModal.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BigButton } from '../BigButton';

export const LoginModal: React.FC = () => {
  const { setIsLoginModalOpen, userLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    userLogin({ email, password })
    .then(() => {
      setIsLoginModalOpen(false);
    })
  }

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

        <form className="LoginModal__form">
          <input 
            className="LoginModal__input" 
            placeholder="Email" 
            name="email"  
            type="email" 
            value={email}
            autoComplete="user-name"
            required 
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            name="password"
            type="password"
            className="LoginModal__input" 
            placeholder="Password"
            value={password}
            required
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />

          <Link to={'#'} className="LoginModal__link">
            Forgot your password?
          </Link>

          <BigButton text="Login" onClick={(e) => handleLoginClick(e)} />
         </form>
      </div>
    </div>
  )
};
