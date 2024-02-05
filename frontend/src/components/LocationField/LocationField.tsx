import React, { useContext, useEffect, useRef, useState } from "react";
import './LocationField.scss';
import { AuthContext } from "../../context/AuthContext";
import { getCities } from "../../api/novaPost";
import { Location } from "../AddressModal/AdressModal";
import { updateUserAddress } from "../../api/user";
import { Address } from "../../types/User";
import { Loader } from "../Loader";

interface Props {
  setLocation: (location: Location) => void;
}

export const LocationField: React.FC<Props> = ({ setLocation }) => {
  const { setAuthUser, authUser} = useContext(AuthContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cityQuery, setCityQuery] = useState('');
  const [cities, setCities] = useState<any[]>([]);

  const locationField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationField.current && isEditingMode) {
      locationField.current.focus();
    }

  }, [isEditingMode])

  const handleCitySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityQuery(event.target.value);
    setIsSelectOpen(true);

    getCities(event.target.value)
    .then(resp => resp.json())
    .then(data => {
      setCities(data.data);
    })
  }

  const handleSelect = (city: any) => {
    setIsSelectOpen(false);
    setIsEditingMode(false);
    setIsSubmitting(true);

    const address: Address = {
      city: `${city.Description}, ${city.AreaDescription}`,
      nova_post_department: '',
      phone_number: authUser?.phone_number || '',
    }

    updateUserAddress(address)
    .then(() => {
      if (authUser) {
        const updatedUser = {
          ...authUser,
          city: `${city.Description}, ${city.AreaDescription}`,
          nova_post_department: '',
        }
        setAuthUser(updatedUser);
      }
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      setCityQuery('');
      setIsSubmitting(false);
      setLocation({
        city: `${city.Description}, ${city.AreaDescription}`, 
        cityRef: city.Ref
      });  
    })
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('select-option')
    ) {
      return;
    }

    setIsEditingMode(false); 
    setIsSelectOpen(false);
    setCityQuery('');
  };

  return (
    <div className="LocationField">
      <div 
        className="LocationField__triger" 
        onClick={() => setIsEditingMode(true)}
      >
        {isSubmitting ? <Loader /> : (
          !isEditingMode ? (
            <span>
              {(authUser?.city) 
                ? `${authUser.city}`          
                : 'Add location'}
            </span>
          ) : (
            <input
              name="location"
              type='text'
              ref={locationField}
              className="LocationField__input"
              onChange={(e) => handleCitySearch(e)}
              onBlur={(e) => handleBlur(e)}
              value={cityQuery}
              placeholder='Enter city name in Ukrainian'
            />
          )
        )}        
      </div>

      {isSelectOpen && (
        <div className="LocationField__select">
          <ul className="LocationField__select-list">
            {!!cities.length ? 
              cities.map((city) => (
                <li key={city.Ref}>
                  <button
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="LocationField__select-option"                
                  >
                    {`${city.Description}, ${city.AreaDescription}`}
                  </button>
                </li>
            )) : (
              <p className="LocationField__select-option">
                No Options
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};