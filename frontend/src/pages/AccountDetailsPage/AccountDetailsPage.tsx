import './AccountDetailsPage.scss';
import { AccountTop } from '../../components/AccountTop';
import { useContext, useEffect, useState } from 'react';
import { AddressModal } from '../../components/AddressModal';
import { getUser, updateUserName } from '../../api/user';
import { User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { Loader } from '../../components/Loader';

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
 const { authUser, setAuthUser, isLoading, setIsLoading } = useContext(AuthContext);
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
    return <Loader />;
  }
  
  const {last_name, first_name} = authUser;
  const isNameEdited = last_name !== newLastName 
    || first_name !== newFirstName;

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedName = {
      first_name: newFirstName,
      last_name: newLastName,
    }

    updateUserName(updatedName)
      .then((data) => {
        setAuthUser(data);
      })      
      .catch((e) => {
        console.log('Update user error', e)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleBlurFirstName = () => {
    if(!newFirstName.trim()) {
      setNewFirstName(first_name)
    }
  }

  const handleBlurLastName = () => {
    if(!newLastName.trim()) {
      setNewLastName(last_name)
    }
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
          onBlur={handleBlurFirstName} 
        />
        <input 
          type="text"
          name="lastName"
          className="AccountDetailsPage__input"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          onBlur={handleBlurLastName} 
        />

        {isNameEdited && <button 
          className="AccountDetailsPage__button" 
          type="submit"
        >
          {isLoading ? <Loader /> : 'Save Changes'}
        </button>}
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
