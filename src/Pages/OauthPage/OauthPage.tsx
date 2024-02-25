import { useKaKaoLogin } from '@Hooks/NetworkHooks';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const OauthPage = () => {
  const callbackUrl = localStorage.getItem('callbackUrl');
  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  const hasNoCallbackUrl = callbackUrl === null;
  const hasNoCode = authorizationCode === null;

  if (hasNoCallbackUrl || hasNoCode) {
    return <Navigate to="/" />;
  }
  return <ValidatedView callbackUrl={callbackUrl} code={authorizationCode} />;
};

const ValidatedView = ({ callbackUrl, code }: { callbackUrl: string; code: string }) => {
  const navigate = useNavigate();
  const { mutate: kakaoLoginMutation } = useKaKaoLogin();

  useEffect(() => {
    kakaoLoginMutation(code, {
      onSuccess() {
        localStorage.removeItem('callbackUrl');
        navigate(callbackUrl);
      },
    });
  }, []);
  return <>로그인 중입니다</>;
};
