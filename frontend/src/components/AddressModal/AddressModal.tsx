import { useContext, useState } from 'react';
import './AddressModal.scss';
import { Dropdown } from '../Dropdown';
import { BigButton } from '../BigButton';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../helpers/constants';
import { updateUserAddress } from '../../api';
import { Address, User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  user: User,
  onClose: (value: boolean) => void,
}

export const AddressModal: React.FC<Props> = ({ user, onClose }) => {
  const {region, city, phone_number, nova_post_department} = user;
  const {token, setAuthUser, authUser} = useContext(AuthContext)

  const [oblast, setOblast] = useState(region);
  const [town, setTown] = useState(city);
  const [postBranch, setPostBranch] = useState(nova_post_department.toString());
  const [phone, setPhone] = useState(phone_number);


  const handleSubmitAddress = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            city,
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
            placeholder={phone_number ? phone_number : 'Add Phone'} 
            className="AddressModal__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Dropdown 
            defaultOption={region ? region : "Select the oblast"} 
            options={OBLASTS}
            currentOption={oblast}
            setCurrentOption={setOblast} 
          />

          <Dropdown 
            defaultOption={city ? city : "Select the city"} 
            options={CITIES}
            currentOption={town}
            setCurrentOption={setTown} 
          />

          <Dropdown 
            defaultOption={nova_post_department 
              ? `${nova_post_department}`
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
