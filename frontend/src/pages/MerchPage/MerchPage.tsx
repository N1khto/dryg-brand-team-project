import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Formik, FormikHelpers } from 'formik';
import cn from 'classnames';
import './MerchPage.scss';

import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loader';
import { sendMerchOrder } from '../../api/order';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import {
  validateEmail,
  validateField,
  validateFirstName,
  validateLastName,
  validatePhone
} from '../../helpers/validateFormFields';

const FIVE_MIN_IN_MILISECONDS = 300000;
const ERROR_DURATION = 6000;

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  message: string;
}

export const MerchPage = React.memo(() => {
  const { setIsLoginModalOpen, authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [limit, setLimit] = useLocalStorage('limit', false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [initialValues, setInitialValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    message: ''
  });

  useEffect(() => {
    if (authUser) {
      setInitialValues({
        ...initialValues,
        firstName: authUser.first_name,
        lastName: authUser.last_name,
        phone_number: authUser.phone_number,
        email: authUser.email
      });
    }
  }, [authUser, initialValues]);

  const handleSubmitOrder = (
    values: FormValues,
    action: FormikHelpers<FormValues>
  ) => {
    if (limit) {
      setIsErrorShown(true);
      action.setSubmitting(false);
      setTimeout(() => {
        setIsErrorShown(false);
      }, ERROR_DURATION);
      return;
    }

    const order = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phone_number,
      message: values.message
    };

    sendMerchOrder(order)
      .then(() => {
        navigate('success');
        setLimit(true);
        setTimeout(() => {
          setLimit(false);
        }, FIVE_MIN_IN_MILISECONDS);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        action.setSubmitting(false);
      });
  };

  return (
    <div className="MerchPage">
      <div className="MerchPage__content">
        <p className="MerchPage__text">
          We accept corporate orders for Hoodies and T-shirts with your
          company's logo.
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
          onSubmit={handleSubmitOrder}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="Form CheckoutPage__form">
              <div className="Form__container">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={cn('Form__field', {
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
                  className={cn('Form__field', {
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
                  className={cn('Form__field', {
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
                  placeholder="Phone"
                  className={cn('Form__field', {
                    'is-error': errors.phone_number && touched.phone_number
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  validate={validatePhone}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="Form__error-message">
                    {errors.phone_number}
                  </div>
                )}
              </div>

              <div className="Form__container">
                <Field
                  as="textarea"
                  type="text"
                  name="message"
                  placeholder="Message"
                  className={cn('MerchPage__textarea', {
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
                {isSubmitting ? <Loader /> : 'Send'}
              </button>
              {isErrorShown && (
                <div className="Form__error-limit">
                  You can only send your next order once every 5 minutes
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>

      <div className="MerchPage__photo" />
    </div>
  );
});
