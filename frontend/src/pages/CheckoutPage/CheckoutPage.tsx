import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './CheckoutPage.scss';
import { ProductInCart } from '../../components/ProductInCart';
import { Link, useNavigate } from 'react-router-dom';
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
import { LocationField } from '../../components/LocationField/LocationField';
import { WarehouseField } from '../../components/WarehouseField/WarehouseField';
import { Location } from '../../components/AddressModal/AdressModal';
import { getCities } from '../../api/novaPost';

interface FormValues {
  firstName: string,
  lastName: string,
  email: string;
  phone_number: string,
}

export const CheckoutPage = () => {
  const {
    cart,
    visibleProducts,
    orderInfo,
    setCart,
  } = useContext(CartContext);
  const { setIsLoginModalOpen, authUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({city: '', cityRef: ''});
  const [warehouse, setWarehouse] = useState('');
  const [cityError, setCityError] = useState('');
  const [postError, setPostError] = useState('');
  const [initialValues, setInitialValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
  });  

  useEffect(() => {
    if(authUser) {
      setInitialValues({
        firstName: authUser.first_name,
        lastName: authUser.last_name,
        phone_number: authUser.phone_number,
        email: authUser.email,
      })       
    }

    if (authUser?.city) {
      const city = authUser.city.split(',')[0];
      const area = authUser.city.split(',')[1].slice(1);
      let cityRef = '';

      getCities(city)
      .then(resp => resp.json())
      .then(data => {
        cityRef = data.data
        .find((c:any) => c.AreaDescription === area).Ref;
        setLocation({city: authUser.city, cityRef})
      })
      .catch((e) => {
        console.log(e);        
      })
      .finally(() => {
        setCityError('');
        setPostError('');
      })      
    }

    if(authUser?.nova_post_department) {
      setWarehouse(authUser.nova_post_department)
    }

  }, [authUser])

  useEffect (() => {

  })

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (Number.parseInt(product.price)), 0);
  }, [cart]);

  const handleSubmitClick = (values: FormValues, action: FormikHelpers<FormValues>) => {
    const cityErrorMessage = validateField(location.city);
    const postErrorMessage = validateField(warehouse);

    if (cityErrorMessage) {
      setCityError(cityErrorMessage);
    }

    if (postErrorMessage) {
      setPostError(postErrorMessage);
    }

    if (cityErrorMessage || postErrorMessage) {
      action.setSubmitting(false);
      return;
    }

    const addInfo = {
      customer_first_name: values.firstName,
      customer_last_name: values.lastName,
      customer_email: values.email,
      customer_phone: values.phone_number,
      delivery_city: location.city,
      delivery_nova_post_department: warehouse,
    }

    if (orderInfo) {
      addOrderInfo(addInfo, orderInfo.uuid)
        .then(() => {
          if (authUser) {
            navigate(`/account/history`)
          } else {
            navigate('success')
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
                <LocationField 
                  setLocation={setLocation} 
                  location={location}
                  error={cityError}
                  setError={setCityError}
                  setWarehouse={setWarehouse} 
                />
                {cityError && (
                  <div className="Form__error-message">{cityError}</div>
                )}
              </div>

              <div className="Form__container">
                <WarehouseField 
                  cityRef={location.cityRef}
                  warehouse={warehouse} 
                  setWarehouse={setWarehouse}
                  error={postError}
                  setError={setPostError}
                />
                {postError && (
                  <div className="Form__error-message">{postError}</div>
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
        <h2 className="CheckoutPage__title">
          {`Shopping Bag - (${cart.length})`}
        </h2>

        <div className="CheckoutPage__bag-content">
          <ul className="CheckoutPage__bag-list">
            {visibleProducts.map(product => (
              <li key={product.id}>
                <ProductInCart product={product} isCartOpen={false}/>
              </li>
            ))}
          </ul>
        </div>

        <div className="CheckoutPage__bag-bottom">
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
    </div>
  );
};
