// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import styles from './SocialLogin.module.scss';
import { useLocation } from 'react-router-dom';
import kakaoLogo from '@Assets/LoginImages/kakao_logo.svg';
import { useKaKaoLogin } from '@Hooks/NetworkHooks';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SocialKakao = () => {
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const [authorizationCode, setAuthorizationCode] = useState<string>('');

  const location = useLocation();

  const { mutate: kakaoLoginMutation } = useKaKaoLogin(authorizationCode);

  useEffect(() => {
    if (location.pathname === '/login') return;
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      setAuthorizationCode(code);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (authorizationCode) {
      kakaoLoginMutation();
    }
  }, [authorizationCode, kakaoLoginMutation]);

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
