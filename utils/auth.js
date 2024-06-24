import { setCookie, destroyCookie } from 'nookies';

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
