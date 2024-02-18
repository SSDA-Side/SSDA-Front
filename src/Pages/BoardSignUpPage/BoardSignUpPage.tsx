import { EmotionImage } from '@Assets/EmotionImages';
import { Typography } from '@Components/Common/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardSignUpPage.module.scss';

export const BoardSignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 일기장 참여 API 호출

    // just for test
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      navigate(`/myboard/${2}`);
    }, 1200);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <EmotionImage type="excited" />

        <Typography as="body1" className={styles.grayed}>
          일기장에 참여중이에요...
        </Typography>
      </div>
    </div>
  );
};
