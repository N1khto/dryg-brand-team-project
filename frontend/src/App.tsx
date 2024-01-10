import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext, useState } from 'react';
import { FilterModal } from './components/FilterModal';
import { CartModal } from './components/CartModal';
import { CartContext } from './context/CartContext';
import { SearchModal } from './components/SearchModal';


const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
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
        {isCartOpen && <CartModal onClose={setIsCartOpen} />}
        {isSearchOpen && <SearchModal onClose={setIsSearchOpen} />}
      </main>

      {isFooterShown && <Footer />}
    </div>
  )
};

export default App;
