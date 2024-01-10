import { Link } from 'react-router-dom';
import './MerchPage.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoginModal } from '../../components/LoginModal';
import { BigButton } from '../../components/BigButton';

export const MerchPage = () => {
  const {isLoginModalOpen, setIsLoginModalOpen} = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSendMerchOrder = (e: React.FormEvent<HTMLButtonElement>) => {

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

        <form action="" className="MerchPage__form">
          <input 
            type="text"
            name="firstName"
            placeholder="First Name" 
            className="MerchPage__input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name" 
            className="MerchPage__input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
          <input 
            className="MerchPage__input" 
            placeholder="Email" 
            name="email"  
            type="email" 
            value={email}
            required 
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            name="tel"
            type="tel"
            className="MerchPage__input" 
            placeholder="Phone"
            value={phone}
            required
            onChange={e => setPhone(e.target.value)}
          />

          <textarea
            name="message"
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
