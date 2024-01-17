import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext, useState } from 'react';
import { CartContext } from './context/CartContext';
import CartModal from './components/Cart/Cart';
import SearchModal from './components/Search/Search';
import FilterModal from './components/Filter/Filter';
import { AuthContext } from './context/AuthContext';
import LoginModal from './components/LoginModal/LoginModal';


const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
  const {isLoginModalOpen,setIsLoginModalOpen} = useContext(AuthContext);
  const {pathname} = useLocation();

  const isFooterShown = pathname !== '/checkout' && pathname !== '/menu';

  return (
    <div className="App">
      <Header setIsSearchOpen={setIsSearchOpen} />

      <main className="main-content">
        <div className="container">
          <Outlet context={{setIsFilterOpen}}/>          
        </div>

        {isFilterOpen && <FilterModal onClose={setIsFilterOpen} />}
        {isCartOpen && <CartModal onClose={setIsCartOpen} /> }
        {isSearchOpen && <SearchModal onClose={setIsSearchOpen} />}
        {isLoginModalOpen && <LoginModal onClose={setIsLoginModalOpen}/>}
      </main>

      {isFooterShown && <Footer />}
    </div>
  )
};

export default App;
