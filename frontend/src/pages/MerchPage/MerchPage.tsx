import { Link } from 'react-router-dom';
import './MerchPage.scss';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loader';
import { Field, Formik } from 'formik';
import classNames from 'classnames';
import { validateEmail, validateField, validateFirstName, validateLastName } from '../../helpers/validateFormFields';

interface FormValues {
  firstName: string,
  lastName: string,
  email: string;
  phone_number: string,
  message: string
}


export const MerchPage = () => {
  const { setIsLoginModalOpen, authUser} = useContext(AuthContext);
  const initialValues: FormValues = useMemo(() => ({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    message: '',
  }), []);

  useEffect(() => {
    if(authUser) {
      initialValues.firstName = authUser.first_name;
      initialValues.lastName = authUser.last_name;
      initialValues.phone_number = authUser.phone_number;
      initialValues.email = authUser.email;
    }

  }, [authUser, initialValues])


  const handleSendMerchOrder = () => {
  }

   return (
    <div className="MerchPage">
      <div className="MerchPage__content">
        <p className="MerchPage__text">
          We accept corporate orders for Hoodies and T-shirts with your company's logo. 
        </p>
        <p className="MerchPage__message">
         WANT TO ORDER meaningful MERCHANDISE that tell a story? WRITE TO US.
        </p>

        {!authUser && (
          <div className="MerchPage__account">
            <p className="MerchPage__account-text">Have an account?</p>
            <Link 
              to={''} 
              className="MerchPage__account-link" 
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </Link>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={handleSendMerchOrder}
          enableReinitialize={true}
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
            <form onSubmit={handleSubmit} className="Form CheckoutPage__form">
              <div className="Form__container">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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

              <div className="Form__container">                
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={classNames('Form__field', {
                    'is-error': errors.email && touched.email
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <div className="Form__error-message">{errors.email}</div>
                )}
              </div>

              <div className="Form__container">
                <Field
                  type="tel"
                  name="phone_number"
                  placeholder='Phone'
                  className={classNames('Form__field', {
                    'is-error': errors.phone_number && touched.phone_number
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  validate={validateField}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="Form__error-message">{errors.phone_number}</div>
                )}
              </div>

              <div className="Form__container">
                <Field as="textarea"
                  type="text"
                  name="message"
                  placeholder='Message'
                  className={classNames('MerchPage__textarea', {
                    'is-error': errors.message && touched.message
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  validate={validateField}
                />
                {errors.message && touched.message && (
                  <div className="Form__error-message">{errors.message}</div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="Form__button"
              >
                {isSubmitting ? (
                  <Loader />
                ) : (
                  'Send'
                )}
              </button>
            </form>
          )}
        </Formik>

      </div>
      <div className="MerchPage__photo"></div>
    </div>
   );
};
