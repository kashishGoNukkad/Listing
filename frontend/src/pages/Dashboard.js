import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import MerchantDashboard from '../components/Dashboard/MerchantDashboard';
import UserDashboard from '../components/Dashboard/UserDashboard';
import Users from '../components/Users';
import Layout from '../components/Layout/Layout';

const Dashboard = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If children are passed (for nested routes), render them
  if (children) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </Layout>
    );
  }

  // Otherwise render the default dashboard based on role
  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'merchant':
        return <MerchantDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {renderDashboard()}
      </div>
    </Layout>
  );
};

export default Dashboard;