import React, { useEffect } from 'react';

import styles from './BoardSignUpPage.module.scss';
import { EmotionImage } from '@Assets/EmotionImages';
import { Typography } from '@Components/Common/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

export const BoardSignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // boardId... 만 있으면 될 듯?

    setTimeout(() => {
      navigate(`/myboard/${2}`);
    }, 1200);
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
