'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

const useAuthRedirect = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  return { token };
};

export default useAuthRedirect;
