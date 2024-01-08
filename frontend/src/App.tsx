import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useContext, useState } from 'react';
import { FavouritesContext } from './context/FavContext';
import { FilterModal } from './components/FilterModal';
import { CartModal } from './components/CartModal';
import { CartContext } from './context/CartContext';


const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
  const {pathname} = useLocation();

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <div className="container">
          <Outlet context={{setIsFilterOpen}}/>          
        </div>

        {isFilterOpen && <FilterModal onClose={setIsFilterOpen} />}
        {isCartOpen && <CartModal onClose={setIsCartOpen} />}
      </main>

      {pathname !== '/checkout' && <Footer />}
    </div>
  )
};

export default App;
