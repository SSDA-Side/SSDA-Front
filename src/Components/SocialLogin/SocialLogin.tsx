// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import styles from './SocialLogin.module.scss';
import { kakaoLogin } from '@APIs/index';
// import KakaoLogin from 'react-kakao-login';

// const kakaoClientId = import.meta.env.VITE_KAKAO_KEY;

// TODO: type 정의
// type UserProfile = {
//   id: number;
//   kakao_account: KakaoAccount;
//   synched_at: string;
//   connected_at: string;
//   properties: Profile;
// };

// type Profile = {
//   nickname: string;
//   profile_image: string;
//   thumbnail_image_url: string;
//   profile_needs_agreement?: boolean;
// };

// type KakaoAccount = {
//   profile: Profile;
//   email: string;
//   age_range: string;
//   birthday: string;
//   birthyear: string;
//   gender: 'female' | 'male';
//   phone_number: string;
//   ci: string;
// };

// type LoginResponse = {
//   token_type: string;
//   access_token: string;
//   expires_in: string;
//   refresh_token: string;
//   refresh_token_expires_in: number;
//   scope: string;
// };

// type KakaoError = {
//   error: string;
//   error_description: string;
// };

// TODO
// 소셜 로그인
// refresh 토근과 access 토큰을 발급
// 마이페이지로 이동 protected route

const SocialKakao = () => {
  const REST_API_KEY = '992ac8b159b158f4299b493df0509202';
  const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
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

export const SocialLoginKakao = () => {
  // const kakaoOnSuccess = async (response: { response: LoginResponse; profile?: UserProfile }) => {
  //   console.log(response);
  //   const idToken = response.response.access_token; // 카카오에서 받아온 토큰
  //   console.log(idToken); // Use the idToken here
  // };

  // const kakaoOnFailure = (error: KakaoError) => {
  //   console.log(error);
  // };

  return (
    <div className={styles.container}>
      {/* <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} /> */}
      <br />
      <br />
      <SocialKakao />
    </div>
  );
};
