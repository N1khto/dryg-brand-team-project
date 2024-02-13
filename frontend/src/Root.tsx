import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MerchPage } from './pages/MerchPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { AccountDetailsPage } from './pages/AccountDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './context/CartContext';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { AccountHistoryPage } from './pages/AccountHistoryPage';
import { AccountWishlistPage } from './pages/AccountWishlistPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { ExchangePage } from './pages/ExchangePage';
import { MobileMenu } from './pages/MobileMenu';
import { OrderCompleted } from './pages/OrderCompleted';
import { MerchCompleted } from './pages/MerchPage/MerchCompleted';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route
        path="/"
        element={
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        }
      >
        <Route index element={<HomePage />} />

        <Route path="shop">
          <Route index element={<Navigate to="products" />} />
          <Route path="products">
            <Route index element={<ShopPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="merch">
          <Route index element={<MerchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="success" element={<MerchCompleted />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="philosophy">
          <Route index element={<PhilosophyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="menu">
          <Route index element={<MobileMenu />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="account">
          <Route index element={<RequireAuth />} />

          <Route path="details" element={<AccountDetailsPage />} />
          <Route path="wishlist" element={<AccountWishlistPage />} />
          <Route path="history" element={<AccountHistoryPage />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="create" element={<CreateAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="checkout">
          <Route index element={<CheckoutPage />} />
          <Route path="success" element={<OrderCompleted />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="delivery">
          <Route index element={<DeliveryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="exchange">
          <Route index element={<ExchangePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
