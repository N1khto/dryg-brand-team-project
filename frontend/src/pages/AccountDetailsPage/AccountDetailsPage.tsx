import './AccountDetailsPage.scss';
import { AccountTop } from '../../components/AccountTop';
import { useContext, useEffect, useState } from 'react';
import { AddressModal } from '../../components/AddressModal';
import { getUser, updateUserName } from '../../api/user';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loader';
import { Field, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { validateFirstName, validateLastName } from '../../helpers/validateFormFields';

interface FormValues {
  firstName: string,
  lastName: string,
}

export const AccountDetailsPage = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isAdreessOpen, setIsAdreessOpen] = useState(false);

  const initialValues: FormValues = {
    firstName: authUser ? authUser.first_name : '',
    lastName: authUser ? authUser.last_name : '',
  };


  if(!authUser) {
    return <Loader />
  }

  const handleSaveChanges = (values: FormValues, action: FormikHelpers<FormValues>) => {
    const updatedName = {
      first_name: values.firstName,
      last_name: values.lastName,
    }

    updateUserName(updatedName)
      .then((data) => {
        setAuthUser(data);
      })      
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        action.setSubmitting(false);
      }) 
  }

   return (
    <div className="AccountDetailsPage">
      <AccountTop />

      <Formik
          initialValues={initialValues}
          onSubmit={handleSaveChanges}
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
                  type="text"
                  name="firstName"
                  className={classNames('Form__field', {
                    'is-error': errors.firstName && touched.firstName
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  validate={validateFirstName}
                />
                {errors.firstName && touched.firstName && (
                  <div className="Form__error-message">{errors.firstName}</div>
                )}
              </div>

              <div className="Form__container">                
                <Field
                  type="text"
                  name="lastName"
                  className={classNames('Form__field', {
                    'is-error': errors.lastName && touched.lastName
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  validate={validateLastName}
                />
                {errors.lastName && touched.lastName && (
                  <div className="Form__error-message">{errors.lastName}</div>
                )}
              </div>

              {(values.firstName !== initialValues.firstName
                || values.lastName !== initialValues.lastName) && (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="AccountDetailsPage__button"
                >
                  {isSubmitting ? (
                    <Loader />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              )}
            </form>
          )}
        </Formik>

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
