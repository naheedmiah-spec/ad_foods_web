import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Wholesale from './pages/Wholesale';
import DeliveryInfo from './pages/DeliveryInfo';
import FAQ from './pages/FAQs';
import Legal from './pages/Legal';

import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminAnalytics from './pages/AdminAnalytics';
import UserManagement from './pages/UserManagement';

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated || !isAdmin) return <Home />; // Or a custom 403 page
  return children;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    // Optionally open cart when adding
    // setIsCartOpen(true); 
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <OrderProvider>
        <div className="app-container">
          <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onRemoveItem={removeFromCart}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/catalog" element={<Catalog onAddToCart={addToCart} cartItems={cartItems} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/delivery" element={<DeliveryInfo />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>} />
              <Route path="/users" element={<ProtectedAdminRoute><UserManagement /></ProtectedAdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
