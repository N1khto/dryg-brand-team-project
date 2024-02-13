import React, { useContext } from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './CreateAccountPage.scss';

import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loader';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword
} from '../../helpers/validateFormFields';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CreateAccountPage = React.memo(() => {
  const { registerNewUser } = useContext(AuthContext);
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const handleCreateAccount = (
    values: FormValues,
    action: FormikHelpers<FormValues>
  ) => {
    const newUser = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    };

    registerNewUser(newUser)
      .then()
      .catch(() => {
        action.setErrors({
          email: 'User with this email address already exists'
        });
      })
      .finally(() => {
        action.setSubmitting(false);
      });
  };

  return (
    <div className="CreateAccountPage">
      <div className="CreateAccountPage__photo"></div>

      <div className="CreateAccountPage__content">
        <div className="CreateAccountPage__nav">
          <NavLink to="/account/login" className={getLoginNavClassName}>
            Login
          </NavLink>
          <NavLink to="/account/create" className={getLoginNavClassName}>
            Create Account
          </NavLink>
        </div>

        <Formik initialValues={initialValues} onSubmit={handleCreateAccount}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="Form">
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
                  autoComplete="username"
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={cn('Form__field', {
                    'is-error': errors.password && touched.password
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <div className="Form__error-message">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="Form__button"
              >
                {isSubmitting ? <Loader /> : 'Create'}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
});
