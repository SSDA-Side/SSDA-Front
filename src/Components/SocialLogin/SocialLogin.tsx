// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import styles from './SocialLogin.module.scss';
import { kakaoLogin } from '@APIs/index';

// TODO
// 소셜 로그인
// refresh 토근과 access 토큰을 발급
// 마이페이지로 이동 protected route

const SocialKakao = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const [authorizationCode, setAuthorizationCode] = useState<string | null>('');

  useEffect(() => {
    console.log('set');
    setAuthorizationCode(() => new URL(window.location.href).searchParams.get('code'));
  }, []);

  useEffect(() => {
    if (authorizationCode) {
      console.log('authorizationCode', authorizationCode);
      kakaoLogin(authorizationCode);
    }
  }, [authorizationCode]);

  return (
    <>
      <button className={styles.kakaoLoginButton} onClick={handleLogin}>
        카카오 로그인
      </button>
    </>
  );
};

export const SocialLogin = () => {
  return (
    <div className={styles.container}>
      <br />
      <br />
      <SocialKakao />
    </div>
  );
};
