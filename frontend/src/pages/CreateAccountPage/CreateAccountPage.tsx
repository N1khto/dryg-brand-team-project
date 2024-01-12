import { useContext, useState } from 'react';
import { BigButton } from '../../components/BigButton';
import './CreateAccountPage.scss';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { AuthContext } from '../../context/AuthContext';

export const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {registerNewUser, userLogin} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmitAccount = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email : email,
      password: password
    }

    registerNewUser(newUser)
      // .then(() => {
      //   userLogin({email, password})
      //   .then(() => {
      //   })
      // })

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
