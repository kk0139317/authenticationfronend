'use client';
// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      {/* <h1>Login Page</h1> */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
