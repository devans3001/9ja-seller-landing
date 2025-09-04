import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import BusinessVerificationPage from './pages/auth/register/BusinessVerificationPage';
import RegisterSuccess from './pages/auth/register/RegisterSuccess';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from './pages/products/ProductsPage';
import AddProductPage from './pages/products/AddProductPage';
import OrdersPage from './pages/orders/OrdersPage';
import StorefrontPage from './pages/storefront/StorefrontPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import AuthLayout from './components/layout/AuthLayout';
// import { useEffect } from 'react';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        {/* Business Verification Routes (separate layout) */}
        <Route path="/register/business-verification/*" element={<BusinessVerificationPage />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        
        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/storefront" element={<StorefrontPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
