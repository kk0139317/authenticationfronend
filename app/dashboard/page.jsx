'use client';
import React from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
import Drawer from '@/components/Drawer';

const Dashboard = () => {
  const { token } = useAuthRedirect();
  const { username, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome  to your dashboard!</p>
      <button onClick={logout} className="px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">
        Logout
      </button>

      <Drawer />
    </div>
  );
};

export default Dashboard;
