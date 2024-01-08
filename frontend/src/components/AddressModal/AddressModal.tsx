import { useState } from 'react';
import './AddressModal.scss';
import { Dropdown } from '../Dropdown';
import { BigButton } from '../BigButton';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../helpers/constants';
import { addAddress } from '../../api';
import { Address } from '../../types/User';

type Props = {
  onClose: (value: boolean) => void,
}

export const AddressModal: React.FC<Props> = ({ onClose }) => {
  const [oblast, setOblast] = useState('');
  const [city, setCity] = useState('');
  const [postBranch, setPostBranch] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmitAddress = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const address: Address = {
      region: oblast,
      city,
      nova_post_department: postBranch,
      phone_number: phone,
    }
    addAddress(address)
    onClose(false);
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
            placeholder="Phone" 
            className="AddressModal__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Dropdown 
            defaultOption="Select the oblast" 
            options={OBLASTS}
            currentOption={oblast}
            setCurrentOption={setOblast} 
          />

          <Dropdown 
            defaultOption="Select the city" 
            options={CITIES}
            currentOption={city}
            setCurrentOption={setCity} 
          />

          <Dropdown 
            defaultOption="Select the branch of Nova Poshta" 
            options={NP_BRANCHES}
            currentOption={postBranch}
            setCurrentOption={setPostBranch} 
          />

          <BigButton text="add address" onClick={(e) => handleSubmitAddress(e)} />
         </form>
      </div>

    </div>
  )
}