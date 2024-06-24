'use client';
import React from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';

const Dashboard = () => {
  const { token } = useAuthRedirect();

//   if (!token) {
//     return <p>Redirecting...</p>;
//   }

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <p>Welcome to your dashboard!</p>
    </>
  );
};

export default Dashboard;
