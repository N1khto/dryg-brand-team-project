import { useContext, useEffect, useState } from 'react';
import './AddressModal.scss';
import { Dropdown } from '../Dropdown';
import { BigButton } from '../BigButton';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../helpers/constants';
import { updateUserAddress } from '../../api/user';
import { Address, User } from '../../types/User';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Field, Formik } from 'formik';

type Props = {
  onClose: (value: boolean) => void,
}

interface FormValues {
  phone_number: string,
  region: string,
  city: string,  
  nova_post_department: number,
}


export const AddressModal: React.FC<Props> = ({ onClose }) => {
  const { setAuthUser, authUser, setIsLoading} = useContext(AuthContext);

  const [oblast, setOblast] = useState('');
  const [town, setTown] = useState('');
  const [postBranch, setPostBranch] = useState('');
  const [phone, setPhone] = useState('');

  const initialValues: FormValues = {
    phone_number: authUser ? authUser.phone_number : '',
    city: authUser ? authUser.city : '',
    region: authUser ? authUser.region : '',
    nova_post_department: authUser? authUser.nova_post_department : 0,
  };


  // useEffect(() => {
  //   if (authUser) {
  //     setOblast(authUser.region || '');
  //     setTown(authUser.city || '')
  //     setPhone(authUser.phone_number || '')
  //     setPostBranch(authUser.nova_post_department 
  //       ? authUser.nova_post_department.toString() 
  //       : '')
  //   }    

  // }, [authUser])


  // const handleSubmitAddress = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true)

  //   const address: Address = {
  //     region: oblast,
  //     city: town,
  //     nova_post_department: +postBranch,
  //     phone_number: phone,
  //   }


  //   updateUserAddress(address)
  //     .then((resp) => {
  //       if (authUser) {
  //         const updatedUser = {
  //           ...authUser,
  //           region: oblast,
  //           city: town,
  //           nova_post_department: +postBranch,
  //           phone_number: phone,
  //         }
  //         setAuthUser(updatedUser);
  //         onClose(false);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })    
  // }
 

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

        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="Form AccountDetailsPage__form">
              <div className="Form__container">
                <Field
                  type="tel"
                  name="phone_number"
                  placeholder={values.phone_number || 'Add Phone'}
                  className={classNames('Form__field', {
                    'is-error': errors.phone_number && touched.phone_number
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="Form__error-message">{errors.phone_number}</div>
                )}
              </div>

              <Field 
                name="region" 
                component="select" 
                placeholder={values.region || "Select the oblast"}
                className="Form__field"
              >
                <option>--Select the oblast--</option>
                {OBLASTS.map(region => (
                  
                  <option key={region} value={region} className="Form__field-option" style={{height: '100px'}}>
                    {region}
                  </option>
                ))}                
              </Field>


              <button 
                type="submit" 
                disabled={isSubmitting}
                className="Form__button"
              >
                {isSubmitting ? (
                  <Loader />
                ) : (
                  'add address'
                )}
              </button>
            </form>
          )}
        </Formik>


        {/* <form className="AddressModal__form">
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
         </form> */}
      </div>
    </div>
  );
};
