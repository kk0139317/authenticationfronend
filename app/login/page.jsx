'use client';
// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      {/* <h1>Login Page</h1> */}
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
