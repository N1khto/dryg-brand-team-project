import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext, useEffect, useState } from 'react';
import { FilterModal } from './components/FilterModal';
import { CartModal } from './components/CartModal';
import { CartContext } from './context/CartContext';
import { SearchModal } from './components/SearchModal';
import { AuthContext } from './context/AuthContext';
import Cookies from 'js-cookie';
import { refreshToken } from './api';
import { TokenObtainPair } from './types/User';


const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
  const { setToken } = useContext(AuthContext);
  const {pathname} = useLocation();

  const isFooterShown = pathname !== '/checkout' && pathname !== '/menu';

  // useEffect(() => {
  //   const refresh_token = Cookies.get('refresh_token');

  //   if (refresh_token) {
  //     refreshToken({refresh: refresh_token})
  //       .then((data: TokenObtainPair) => {
  //         setToken(data.access)
  //         Cookies.set('refresh_token', data.refresh);
  //         Cookies.set('access_token', data.access);
  //       })
  //       .catch((e) => {
  //         console.log(e)
  //       })
  //   }

  // }, [])

  return (
    <div className="App">
      <Header setIsSearchOpen={setIsSearchOpen} />

      <main className="main-content">
        <div className="container">
          <Outlet context={{setIsFilterOpen}}/>          
        </div>

        {isFilterOpen && <FilterModal onClose={setIsFilterOpen} />}
        {isCartOpen && <CartModal onClose={setIsCartOpen} />}
        {isSearchOpen && <SearchModal onClose={setIsSearchOpen} />}
      </main>

      {isFooterShown && <Footer />}
    </div>
  )
};

export default App;
