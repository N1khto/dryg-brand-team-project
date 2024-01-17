import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './CheckoutPage.scss';
import { ProductInCart } from '../../components/ProductInCart';
import { Link, useNavigate } from 'react-router-dom';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../contants/delivery';
import { AuthContext } from '../../context/AuthContext';
import { addOrderInfo } from '../../api/order';
import { Loader } from '../../components/Loader';
import { Field, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { 
  validateEmail, 
  validateField, 
  validateFirstName, 
  validateLastName, 
  validatePhone
} from '../../helpers/validateFormFields';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

interface FormValues {
  firstName: string,
  lastName: string,
  email: string;
  phone_number: string,
  region: string,
  city: string,  
  nova_post_department: number,
}

export const CheckoutPage = () => {
  const {
    cart,
    visibleProducts,
    orderInfo,
    setCart,
  } = useContext(CartContext);
  const { setIsLoginModalOpen, authUser} = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    city: '',
    region: '',
    nova_post_department: 0,
  })
  const navigate = useNavigate();

  useEffect(() => {
    if(authUser) {
      setInitialValues({
        city: authUser.city,
        firstName: authUser.first_name,
        lastName: authUser.last_name,
        region: authUser.region,
        phone_number: authUser.phone_number,
        email: authUser.email,
        nova_post_department: authUser.nova_post_department,
    })
       
    }

  }, [authUser])


  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (+product.price), 0);
  }, [cart]);

  const handleSubmitClick = (values: FormValues, action: FormikHelpers<FormValues>) => {
    const addInfo = {
      customer_first_name: values.firstName,
      customer_last_name: values.lastName,
      customer_email: values.email,
      customer_phone: values.phone_number,
      delivery_region: values.region,
      delivery_city: values.city,
      delivery_nova_post_department: values.nova_post_department,
    }

    if (orderInfo) {
      addOrderInfo(addInfo, orderInfo.id.toString())
        .then(() => {
          if (authUser) {
            navigate(`/account/history`)
          } else {
            navigate('completed')
          }
          
          window.open(orderInfo.payment_link, '_blank');
          setCart([]);
        })
        .catch((e) => {
          console.log(e);          
        })
        .finally(() => [
          action.setSubmitting(false)
        ])
    }
  }

  return (
    <div className="CheckoutPage">
      <div className="CheckoutPage__container">
        {!authUser && (
          <div className="CheckoutPage__header">
            <p className="CheckoutPage__info">Have an account?</p>
            <Link to={''} className="CheckoutPage__link" onClick={() => setIsLoginModalOpen(true)}>
              Log in
            </Link>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitClick}
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
                  autoComplete="username"
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
                  validate={validatePhone}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="Form__error-message">{errors.phone_number}</div>
                )}
              </div>

              <div className="Form__container">
                <Field
                  className={classNames({
                    'is-error-select': errors.region && touched.region
                  })}
                  name="region"
                  options={OBLASTS}
                  component={CustomSelect}
                  placeholder="Select the oblast"
                  validate={validateField}
                />
                {errors.region && touched.region && (
                  <div className="Form__error-message">{errors.region}</div>
                )}
              </div>

              <div className="Form__container">
                <Field
                  name="city"
                  className={classNames({
                    'is-error-select': errors.city && touched.city
                  })}
                  options={CITIES[values.region]}
                  component={CustomSelect}
                  placeholder="Select the city"
                  isDisabled={values.region === ''}
                  validate={validateField}
                />
                {errors.city && touched.city && (
                  <div className="Form__error-message">{errors.city}</div>
                )}
              </div>

              <div className="Form__container">
                <Field
                  name="nova_post_department"
                  className={classNames({
                    'is-error-select': errors.nova_post_department && touched.nova_post_department
                  })}
                  options={NP_BRANCHES}
                  component={CustomSelect}
                  placeholder="Select the branch of Nova Poshta"
                  isDisabled={values.city === ''}
                  validate={validateField}
                />
                {errors.nova_post_department && touched.nova_post_department && (
                  <div className="Form__error-message">{errors.nova_post_department}</div>
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
                  'Continue to payment'
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>

      <div className="CheckoutPage__bag">
        <h2 className="CheckoutPage__title">{`Shopping Bag - (${cart.length})`}</h2>

        <div className="CheckoutPage__bag-content">
          <ul className="CheckoutPage__bag-list">
            {visibleProducts.map(product => (
              <li key={product.id}>
                <ProductInCart product={product} isCartOpen={false}/>
              </li>
            ))}
          </ul>
        </div>

        <div className="CheckoutPage__delivery">
          <p className="CheckoutPage__delivery-title">Delivery</p>
          <p className="CheckoutPage__delivery-value">Nova Poshta</p>
        </div>

        <div className="CheckoutPage__total">
          <p className="CheckoutPage__total-title">Total</p>
          <p className="CheckoutPage__total-value">{`${totalPrice} UAH`}</p>
        </div>
      </div>
    </div>
  );
};
