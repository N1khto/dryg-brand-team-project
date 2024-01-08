import { Link, useNavigate } from 'react-router-dom';
import './LoginModal.scss';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { verifyToken } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { BigButton } from '../BigButton';

export const LoginModal: React.FC = () => {
  const { setIsLoginModalOpen } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      email : email,
      password: password
    }
    try {
      const data = await verifyToken(user)
      
      // Cookies.set('access_token', data.access);
      // Cookies.set('refresh_token', data.refresh);
      // navigate("/");
    }
    catch (error) {
      console.error("error in token fetch: ", error)
    }
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
