import { EmotionImage } from '@Assets/EmotionImages';
import { Typography } from '@Components/Common/Typography';
import { useKaKaoLogin } from '@Hooks/NetworkHooks';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './OauthPage.module.scss';

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
        const state = localStorage.getItem('callbackState');

        if (state !== null) {
          const { boardId } = JSON.parse(state);
          navigate(callbackUrl, { state: { boardId } });
        } else {
          navigate(callbackUrl);
        }
      },
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.title}>Dassda</p>
        </header>

        <div className={styles.body}>
          <EmotionImage type="excited" />

          <Typography as="body1" className={styles.grayed}>
            로그인 중입니다...
          </Typography>
        </div>
      </div>
    </>
  );
};
