// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import styles from './SocialLogin.module.scss';
import { kakaoLogin } from '@APIs/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import kakaoLogo from '@Assets/LoginImages/kakao_logo.svg';
import { setCookie } from '@Utils/Cookies';
import { KakaoLoginResponse } from '@Type/index';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SocialKakao = () => {
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const [authorizationCode, setAuthorizationCode] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: KakaoLoginMutation } = useMutation<KakaoLoginResponse, AxiosError, string>({
    mutationFn: kakaoLogin,
    onSuccess: (data) => {
      // const expirationTime = new Date();
      // expirationTime.setSeconds(expirationTime.getSeconds() + data.expiresIn);

      // setCookie('accessToken', data['accessToken'], { path: '/', expires: expirationTime });
      setCookie('accessToken', data['accessToken'], { path: '/' });
      localStorage.setItem('refreshToken', data['refreshToken']);
      navigate('/myboard');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {
    if (location.pathname === '/login') return;
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      setAuthorizationCode(code);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (authorizationCode) {
      KakaoLoginMutation(authorizationCode);
    }
  }, [authorizationCode, KakaoLoginMutation]);

  return (
    <>
      <button className={styles.kakaoLoginButton} onClick={handleLogin}>
        <img src={kakaoLogo} alt="kakaoLogo" />
        카카오로 시작하기
      </button>
    </>
  );
};

export const SocialLogin = () => {
  return <SocialKakao />;
};
