import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import './LocationField.scss';
import { getCities } from "../../api/novaPost";
import { Location } from "../AddressModal/AddressModal";
import { Loader } from "../Loader";
import classNames from "classnames";
import debounce from 'lodash.debounce';

interface Props {
  setLocation: (location: Location) => void;
  location: Location,
  error?: string,
  setError?: (error: string) => void,
  setWarehouse: (warehouse: string) => void;
}

export const LocationField: React.FC<Props> = React.memo(({ 
  setLocation, 
  location,
  error, 
  setError = () => {},
  setWarehouse,
 }) => {
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

  }, [isEditingMode]);


  const handleCitySearch = useCallback((query: string) => {
    getCities(query)
      .then(resp => resp.json())
      .then(data => {
        setCities(data.data);
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setIsSubmitting(false);
      })

  }, [])

  const debouncedCitySearch = useMemo(
    () => debounce(handleCitySearch, 1000)
  , [handleCitySearch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityQuery(event.target.value);
    setIsSelectOpen(true);
    setError('');
    setIsSubmitting(true);
    debouncedCitySearch(event.target.value);
  }

  const handleSelect = (city: any) => {
    setIsSelectOpen(false);
    setIsEditingMode(false);
    setLocation({
      city: `${city.Description}, ${city.AreaDescription}`, 
      cityRef: city.Ref
    });
    setError('');
    setCityQuery('');
    setWarehouse('');
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
        className={classNames("LocationField__triger", {
          'is-error': error?.length,
        })} 
        onClick={() => setIsEditingMode(true)}
      >
        {!isEditingMode && location.city && (
          <span>{location.city}</span>
        )}

        {!isEditingMode && !location.city && (
          <span className="LocationField__placeholder">
            Add location
          </span>
        )}

        {isEditingMode && (
          <input
            name="location"
            type='text'
            ref={locationField}
            className="LocationField__input"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            value={cityQuery}
            placeholder='Enter city name in Ukrainian'
          />
        )}
      </div>

      {isSelectOpen && (
        <div className="LocationField__select">
          {isSubmitting && <Loader />}

          {!isSubmitting && (
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
          )}
        </div>
      )}
    </div>
  );
});
