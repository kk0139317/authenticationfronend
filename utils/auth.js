import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

export const login = async (email, password) => {
  const response = await fetch('http://localhost:8000/api/loginuser/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  
  // Set the cookie
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  return data;
};

export const logout = () => {
  // Destroy the cookie
  destroyCookie(null, 'token');
};

export const useAuth = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;

  const login = async (email, password) => {
    try {
      const data = await login(email, password);
      router.push('/');
      return data;
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const logout = () => {
    destroyCookie(null, 'token');
    router.push('/login');
  };

  return { token, login, logout };
};
