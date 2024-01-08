import { useState } from 'react';
import { BigButton } from '../../components/BigButton';
import './CreateAccountPage.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { verifyToken } from '../../api';
import { getLoginNavClassName } from '../../helpers/getNavClassName';

export const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitAccount = async (e: React.FormEvent<HTMLButtonElement>) => {
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
    <div className="CreateAccountPage">
      <div className="CreateAccountPage__photo"></div>
      
      <div className="CreateAccountPage__content">
        <div className="CreateAccountPage__nav">
          <NavLink to="/account/login" className={getLoginNavClassName}>
            Login
          </NavLink>
          <NavLink to="/account/createAccount" className={getLoginNavClassName}>
            Create Account
          </NavLink>
        </div>

        <form action="" className="CreateAccountPage__form">
          <input 
            type="text"
            name="firstName"
            placeholder="First Name" 
            className="CreateAccountPage__input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name" 
            className="CreateAccountPage__input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
          <input 
            className="CreateAccountPage__input" 
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
            className="CreateAccountPage__input" 
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />

          <BigButton text="Create" onClick={(e) => handleSubmitAccount(e)} />
        </form>
      </div>
    </div>
  );
};
