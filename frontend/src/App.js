import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useState } from 'react';
import AllProductsPage from './Pages/AllProductsPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';

function App() {
  const [token, setToken] = useState(null)
  const logout = () => setToken(null)
  console.log("token:", token);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation token={token} logout={logout} />
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
          <Route path="/shop" element={<AllProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
