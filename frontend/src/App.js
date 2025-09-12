import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import MerchantDashboard from './components/Dashboard/MerchantDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import Users from './components/Users';
import AddUsers from './components/AddUsers';
import AllCategories from './components/AllCategories';
import AddCategory from './components/AddCategory';
import AllProducts from './components/AllProducts';
import MerchantProducts from './components/MerchantProducts';
import UserProfile from './components/UserProfile';
import './App.css';
import { useAuth } from './contexts/AuthContext';

// Role-based route components
const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
);

const MerchantRoute = ({ children }) => (
  <ProtectedRoute requiredRole="merchant">{children}</ProtectedRoute>
);

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function AppContent() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } 
      />
      
      {/* Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin-only subroutes under dashboard */}
      <Route 
        path="/dashboard/categories/all" 
        element={
          <AdminRoute>
            <Dashboard>
              <AllCategories />
            </Dashboard>
          </AdminRoute>
        } 
      />
      <Route 
        path="/dashboard/categories/add-category" 
        element={
          <AdminRoute>
            <Dashboard>
              <AddCategory />
            </Dashboard>
          </AdminRoute>
        } 
      />
      <Route 
        path="/dashboard/categories/all-products" 
        element={
          <AdminRoute>
            <Dashboard>
              <AllProducts />
            </Dashboard>
          </AdminRoute>
        } 
      />
{/* 
      <Route 
        path="/dashboard/users/add-user" 
        element={
          <AdminRoute>
            <Dashboard>
              <AddUsers />
            </Dashboard>
          </AdminRoute>
        } 
      /> */}


      
      {/* Merchant-only subroutes under dashboard */}
      <Route 
        path="/dashboard/products/all-products" 
        element={
          <MerchantRoute>
            <Dashboard>
              <MerchantProducts />
            </Dashboard>
          </MerchantRoute>
        } 
      />

      {/* <Route 
        path="/dashboard/users/all" 
        element={
          <MerchantRoute>
            <Dashboard>
              <Users />
            </Dashboard>
          </MerchantRoute>
        } 
      /> */}



      {/* User-only subroutes under dashboard */}
      <Route 
        path="/dashboard/profile" 
        element={
          <ProtectedRoute>
            <Dashboard>
              <UserProfile />
            </Dashboard>
          </ProtectedRoute>
        } 
      />
      

      {/* Common Routes */}

      <Route 
        path="/dashboard/users/all" 
        element={
          <ProtectedRoute requiredRole={["admin", "merchant"]}>
            <Dashboard>
              <Users />
            </Dashboard>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/users/add-user" 
        element={
          <ProtectedRoute requiredRole={["admin", "merchant"]}>
            <Dashboard>
              <AddUsers />
            </Dashboard>
          </ProtectedRoute>
        } 
      />

      {/* Admin only routes */}
      <Route 
        path="/admin/*" 
        element={
          <AdminRoute>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Admin Section</h1>
              <AdminDashboard />
            </div>
          </AdminRoute>
        } 
      />
      
      {/* Merchant only routes */}
      <Route 
        path="/merchant/*" 
        element={
          <MerchantRoute>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Merchant Section</h1>
              <MerchantDashboard />
            </div>
          </MerchantRoute>
        } 
      />
      
      {/* User only routes */}
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">User Section</h1>
              <UserDashboard />
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
            <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;