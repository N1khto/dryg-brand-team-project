import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Field, Formik, FormikHelpers } from 'formik';
import cn from 'classnames';

import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../../components/Loader';
import {
  validateEmail,
  validatePassword
} from '../../helpers/validateFormFields';

interface FormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { userLogin, setIsLoginModalOpen } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const handleLoginClick = (
    values: FormValues,
    action: FormikHelpers<FormValues>
  ) => {
    userLogin(values)
      .then(() => {
        if (pathname === '/account/login') {
          navigate('/account');
        } else {
          navigate(pathname);
        }
        setIsLoginModalOpen(false);
      })
      .catch(() => {
        action.setErrors({
          email: 'No active account found with the given credentials',
          password: 'No active account found with the given credentials'
        });
      })
      .finally(() => {
        action.setSubmitting(false);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleLoginClick}>
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
            {isSubmitting ? <Loader /> : 'Login'}
          </button>
        </form>
      )}
    </Formik>
  );
};
