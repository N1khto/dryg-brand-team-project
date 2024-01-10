import { useState } from 'react';
import { BigButton } from '../../components/BigButton';
import './LoginPage.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getToken } from '../../api';
import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { TokenObtainPair } from '../../types/User';
import Cookies from 'js-cookie';

export const LoginPage = () => {
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
      const data: TokenObtainPair = await getToken(user);
      
      Cookies.set('access_token', data.access);
      Cookies.set('refresh_token', data.refresh);
      navigate("/account");
    }
    catch (error) {
      console.error("error in token fetch: ", error)
    }
  }

   return (
    <div className="LoginPage">
      <div className="LoginPage__photo"></div>
      
      <div className="LoginPage__content">
        <div className="LoginPage__nav">
          <NavLink to="/account/login" className={getLoginNavClassName}>
            Login
          </NavLink>
          <NavLink to="/account/createAccount" className={getLoginNavClassName}>
            Create Account
          </NavLink>
        </div>

        <form action="" className="LoginPage__form">
          <input 
            className="LoginPage__input" 
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
            className="LoginPage__input" 
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />

          <Link to={'#'} className="LoginPage__link">
            Forgot your password?
          </Link>

          <BigButton text="Login" onClick={(e) => handleLoginClick(e)} />
        </form>
      </div>
    </div>
  );
};
