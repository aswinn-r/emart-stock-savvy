
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import InventoryEntry from '../components/InventoryEntry';
import InventoryTracking from '../components/InventoryTracking';
import Alerts from '../components/Alerts';
import Login from '../components/Login';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState('');

  React.useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('authToken', 'demo-token');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout userRole={userRole} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard userRole={userRole} />} />
        <Route path="/inventory-entry" element={<InventoryEntry userRole={userRole} />} />
        <Route path="/inventory-tracking" element={<InventoryTracking />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default Index;
