import { Link } from 'react-router-dom';
import './MerchPage.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoginModal } from '../../components/LoginModal';
import { BigButton } from '../../components/BigButton';

export const MerchPage = () => {
  const {isLoginModalOpen, setIsLoginModalOpen, authUser} = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(authUser) {
      setFirstName(authUser.first_name);
      setLastName(authUser.last_name);
      setPhone(authUser.phone_number);
      setEmail(authUser.email);
    }

  }, [authUser])

  const handleSendMerchOrder = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

   return (
    <div className="MerchPage">
      <div className="MerchPage__content">
        <p className="MerchPage__text">
          We accept corporate orders for hoodies and T-shirts with your company's logo. 
        </p>
        <p className="MerchPage__message">
         WANT TO ORDER meaningful MERCHANDISE that tell a story? WRITE TO US.
        </p>

        {!authUser && (
          <div className="MerchPage__account">
            <p className="MerchPage__account-text">Have an account?</p>
            <Link 
              to={''} 
              className="MerchPage__account-link" 
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </Link>
          </div>
        )}

        <form action="" className="MerchPage__form">
          <input 
            type="text"
            name="firstName"
            placeholder="First Name" 
            className="MerchPage__input"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name" 
            className="MerchPage__input"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
          <input 
            className="MerchPage__input"
            required 
            placeholder="Email" 
            name="email"  
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            name="tel"
            type="tel"
            className="MerchPage__input"
            required 
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <textarea
            name="message"
            required
            className="MerchPage__textarea" 
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)} 
          />

          <BigButton text="Send" onClick={(e) => handleSendMerchOrder(e)} />
        </form>


      </div>
      <div className="MerchPage__photo"></div>
      {isLoginModalOpen && <LoginModal />}
    </div>
   );
};
