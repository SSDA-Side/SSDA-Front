// import { useEffect } from 'react';
import styles from './SocialLogin.module.scss';
import kakaoLogo from '@Assets/LoginImages/kakao_logo.svg';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SocialKakao = () => {
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  // TODO: [feat] access token과 refresh token 기능 추가

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
