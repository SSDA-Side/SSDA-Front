import { getCookie } from '@Utils/Cookies';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRouter = () => {
  const queryClient = useQueryClient();
  const token = getCookie('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      queryClient.clear();
      navigate('/login');
      return;
    }
  }, [token, navigate, queryClient]);

  return <Outlet />;
};
