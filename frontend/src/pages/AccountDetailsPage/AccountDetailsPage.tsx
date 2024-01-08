import './AccountDetailsPage.scss';
import { AccountTop } from '../../components/AccountTop';
import { useState } from 'react';
import { AddressModal } from '../../components/AddressModal';

export const AccountDetailsPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdreessOpen, setIsAdreessOpen] = useState(false);

   return (
    <div className="AccountDetailsPage">
      <AccountTop />
      <form action="" className="AccountDetailsPage__form">
          <input 
            type="text"
            name="firstName"
            placeholder="First Name" 
            className="AccountDetailsPage__input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name" 
            className="AccountDetailsPage__input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
        </form>

        <button 
          type="button" 
          onClick={() => setIsAdreessOpen(true)}
          className="AccountDetailsPage__link"
        >
          Add Address
        </button>

        {isAdreessOpen && <AddressModal onClose={setIsAdreessOpen}/>}
    </div>
   );
};
