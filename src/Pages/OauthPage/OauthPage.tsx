import { useKaKaoLogin } from '@Hooks/NetworkHooks';
import { getCookie } from '@Utils/Cookies';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OauthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('accessToken')) navigate('/myboard');
  }, [navigate]);
  const [authorizationCode, setAuthorizationCode] = useState<string>('');
  const { mutate: kakaoLoginMutation } = useKaKaoLogin(authorizationCode);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      setAuthorizationCode(code);
    }
  }, []);

  useEffect(() => {
    if (authorizationCode) {
      kakaoLoginMutation();
    }
  }, [authorizationCode, kakaoLoginMutation]);

  return <></>;
};
