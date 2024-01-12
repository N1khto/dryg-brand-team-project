import { useContext, useEffect, useState } from 'react';
import './AddressModal.scss';
import { Dropdown } from '../Dropdown';
import { BigButton } from '../BigButton';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../helpers/constants';
import { updateUserAddress } from '../../api';
import { Address, User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  onClose: (value: boolean) => void,
}

export const AddressModal: React.FC<Props> = ({  onClose }) => {
  const { setAuthUser, authUser, setIsLoading} = useContext(AuthContext);

  const [oblast, setOblast] = useState('');
  const [town, setTown] = useState('');
  const [postBranch, setPostBranch] = useState('');
  const [phone, setPhone] = useState('');

  

  useEffect(() => {
    if (authUser) {
      setOblast(authUser.region || '');
      setTown(authUser.city || '')
      setPhone(authUser.phone_number || '')
      setPostBranch(authUser.nova_post_department 
        ? authUser.nova_post_department.toString() 
        : '')
    }    

  }, [authUser])


  const handleSubmitAddress = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true)

    const address: Address = {
      region: oblast,
      city: town,
      nova_post_department: +postBranch,
      phone_number: phone,
    }


    updateUserAddress(address)
      .then((resp) => {
        if (authUser) {
          const updatedUser = {
            ...authUser,
            region: oblast,
            city: town,
            nova_post_department: +postBranch,
            phone_number: phone,
          }
          setAuthUser(updatedUser);
          onClose(false);
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
    
  }
 

  return (
    <div className="AddressModal">
            <div className="AddressModal__container">
        <div className="AddressModal__header">
          <h2 className="AddressModal__title">Login</h2>
          <button
            type="button"
            className="AddressModal__button"
            onClick={() => onClose(false)}
          >
            <div className="icon icon--close" />
          </button>
        </div>

        <form className="AddressModal__form">
          <input 
            type="tel"
            name="tel"
            placeholder={phone ? phone: 'Add Phone'} 
            className="AddressModal__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Dropdown 
            defaultOption={oblast ? oblast: "Select the oblast"} 
            options={OBLASTS}
            currentOption={oblast}
            setCurrentOption={setOblast} 
          />

          <Dropdown 
            defaultOption={town ? town : "Select the city"} 
            options={CITIES}
            currentOption={town}
            setCurrentOption={setTown} 
          />

          <Dropdown 
            defaultOption={postBranch 
              ? `${postBranch}`
              : "Select the branch of Nova Poshta"} 
            options={NP_BRANCHES}
            currentOption={postBranch}
            setCurrentOption={setPostBranch} 
          />

          <BigButton text="add address" onClick={(e) => handleSubmitAddress(e)} />
         </form>
      </div>
    </div>
  );
};
