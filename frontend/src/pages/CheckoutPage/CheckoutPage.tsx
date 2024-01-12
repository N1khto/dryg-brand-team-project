import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './CheckoutPage.scss';
import { ProductInCart } from '../../components/ProductInCart';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import { CITIES, NP_BRANCHES, OBLASTS } from '../../helpers/constants';
import { BigButton } from '../../components/BigButton';
import { AuthContext } from '../../context/AuthContext';
import { LoginModal } from '../../components/LoginModal';

export const CheckoutPage = () => {
  const {
    cart,
    visibleProducts,
  } = useContext(CartContext);
  const {isLoginModalOpen, setIsLoginModalOpen, authUser} = useContext(AuthContext);
  const [oblast, setOblast] = useState('');
  const [city, setCity] = useState('');
  const [postBranch, setPostBranch] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(authUser) {
      setCity(authUser.city);
      setFirstName(authUser.first_name);
      setLastName(authUser.last_name);
      setOblast(authUser.region);
      setPhone(authUser.phone_number);
      setEmail(authUser.email);
      setPostBranch(authUser.nova_post_department 
        ? authUser.nova_post_department.toString()
        : '')
    }

  }, [authUser])


  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (+product.price), 0);
  }, [cart]);

  const handleSubmitClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() 
      || !email.trim() || !phone.trim() 
      || !postBranch.trim() || !oblast.trim() 
      || !city.trim()) {
        return;
      }

      
    navigate('stripeUrl');
  }


  return (
    <div className="CheckoutPage">
      <div className="CheckoutPage__container">
        <div className="CheckoutPage__header">
          <p className="CheckoutPage__info">Have an account?</p>
          <Link to={''} className="CheckoutPage__link" onClick={() => setIsLoginModalOpen(true)}>
            Log in
          </Link>
        </div>
        <form action="" className="CheckoutPage__form">
          <input 
            type="text"
            name="firstName"
            placeholder="First Name" 
            className="CheckoutPage__input"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Last Name" 
            className="CheckoutPage__input"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
          <input 
            type="email"
            name="email"
            placeholder="Email" 
            className="CheckoutPage__input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="tel"
            name="tel"
            placeholder="Phone" 
            className="CheckoutPage__input"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Dropdown 
            defaultOption="Select the oblast" 
            options={OBLASTS}
            currentOption={oblast}
            setCurrentOption={setOblast} 
          />

          <Dropdown 
            defaultOption="Select the city" 
            options={CITIES}
            currentOption={city}
            setCurrentOption={setCity} 
          />

          <Dropdown 
            defaultOption="Select the branch of Nova Poshta" 
            options={NP_BRANCHES}
            currentOption={postBranch}
            setCurrentOption={setPostBranch} 
          />

          <BigButton text='Continue to payment' onClick={(e) => handleSubmitClick(e)} />
        </form>
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
      {isLoginModalOpen && <LoginModal />}
    </div>
  );
};
