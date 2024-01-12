import './AccountDetailsPage.scss';
import { AccountTop } from '../../components/AccountTop';
import { useContext, useEffect, useState } from 'react';
import { AddressModal } from '../../components/AddressModal';
import { getUser, updateUserName } from '../../api';
import { User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const userInit = {
  id: 3,
  email: 'fxgb@trhtr',
  first_name: 'Jone',
  last_name: 'Stone',
  region: "Kyiv Oblast",
  city: "Kyiv",
  nova_post_department: 3,
  phone_number: "+3805545521",
}


export const AccountDetailsPage = () => {
 const { authUser, setAuthUser } = useContext(AuthContext);
 const [newFirstName, setNewFirstName] = useState('');
 const [newLastName, setNewLastName] = useState('');
  const [isAdreessOpen, setIsAdreessOpen] = useState(false);

  useEffect(() => {
    if (authUser) {
      setNewFirstName(authUser.first_name)
      setNewLastName(authUser.last_name)
    }
  }, [authUser])


  if (!authUser) {
    return <div>Something went wrong</div>;
  }

  
  const {last_name, first_name} = authUser;


  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = {
      first_name: newFirstName.trim() ? newFirstName.trim() : first_name,
      last_name: newLastName.trim() ? newLastName.trim() : last_name,
    }

    updateUserName(updatedName)
      .then((data) => {
        setAuthUser(data)
      })      
      .catch((e) => {
        console.log('Update user error', e)
      })
  }


   return (
    <div className="AccountDetailsPage">
      <AccountTop />
      <form 
        className="AccountDetailsPage__form"
        onSubmit={(e) => handleSaveChanges(e)}
      >
        <input 
          type="text"
          name="firstName"
          className="AccountDetailsPage__input"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)} 
        />
        <input 
          type="text"
          name="lastName"
          className="AccountDetailsPage__input"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)} 
        />

        {(newFirstName || newLastName) && (
          <button type="submit">Save</button>
        )}

      </form>

      <button 
        type="button" 
        onClick={() => setIsAdreessOpen(true)}
        className="AccountDetailsPage__link"
      >
        Add Address
      </button>

      {isAdreessOpen && <AddressModal user={authUser} onClose={setIsAdreessOpen}/>}
    </div>
   );
};
