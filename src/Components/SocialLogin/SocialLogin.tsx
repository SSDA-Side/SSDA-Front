// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import styles from './SocialLogin.module.scss';
import { KakaoLoginResponse, kakaoLogin } from '@APIs/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import kakaoLogo from '@Assets/LoginImages/kakao_logo.svg';
import { setCookie } from '@Utils/Cookies';

// TODO
// - [X] 소셜 로그인
// - [ ] refresh 토큰과 access 토큰 - https://s0ojin.tistory.com/44
// - [X] access token 만료시간 설정
// - [X] protected route
// - [x] header에 권한 추가 (axios)
// - [X] 만약에 로그인이 되어 있는 상태이면 로그인 페이지로 이동하지 않고, 메인 페이지로 이동

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const SocialKakao = () => {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const [authorizationCode, setAuthorizationCode] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  const { mutate } = useMutation<KakaoLoginResponse, AxiosError, string>({
    mutationFn: kakaoLogin,
    onSuccess: (data) => {
      const expirationTime = new Date();
      expirationTime.setSeconds(expirationTime.getSeconds() + data.expiresIn);

      setCookie('accessToken', data['accessToken'], { path: '/', expires: expirationTime });
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
      mutate(authorizationCode);
    }
  }, [authorizationCode, mutate]);

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
