import { EmotionImage } from '@Assets/EmotionImages';
import { CTAButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';
import { useGetShareLinkMetadata } from '@Hooks/NetworkHooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SharePage.module.scss';

export const SharePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isInvalidAccess, setIsInvalidAccess] = useState(false);
  const [hashKey, setHashKey] = useState('');

  const { data: shareMetadata, mutate, isPending } = useGetShareLinkMetadata();

  useEffect(() => {
    const { search } = location;

    if (search.trim() === '') {
      return setIsInvalidAccess(true);
    }

    const searchParams = new URLSearchParams(search);
    const hasHashKey = searchParams.has('hash');

    if (!hasHashKey) {
      return setIsInvalidAccess(true);
    }

    const tmpHashKey = searchParams.get('hash')!.trim();

    if (tmpHashKey === '') {
      return setIsInvalidAccess(true);
    }

    setHashKey(tmpHashKey);
  }, []);

  useEffect(() => {
    if (hashKey === '') {
      return;
    }

    mutate({ hashKey });
  }, [hashKey]);

  if (isInvalidAccess) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.title}>Dassda</p>
        </header>

        <div className={styles.body}>
          <div className={styles.content}>
            <EmotionImage type="sad" />
            <Typography as="body1">잘못된 접근입니다.</Typography>
            <Typography as="body2">초대 링크를 다시 한번 확인해보세요.</Typography>

            <CTAButton onClick={() => navigate('/login')}>다쓰다 첫화면으로 돌아가기</CTAButton>
          </div>
        </div>
      </div>
    );
  }

  const handleSignupClick = () => {
    navigate('/signup_board');
  };

  if (isPending) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.title}>Dassda</p>
        </header>

        <div className={styles.body}>
          <div className={styles.content}>
            <EmotionImage type="normal" />
            <Typography as="body1">불러오는 중입니다...</Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <section className={styles.content}>
          <EmotionImage type="fell_in_love" />

          <div className={styles.texts}>
            <Typography as="h2" className={styles.spacing12}>
              {shareMetadata?.username}님이
            </Typography>
            <Typography as="h2">
              <strong>{shareMetadata?.title}</strong> 일기장에 초대했어요!
            </Typography>
          </div>

          <Typography as="body2" className={styles.grayed}>
            일기장에 참여해서 일상을 공유해보세요
          </Typography>
        </section>

        <section className={styles.ctaWrapper}>
          <CTAButton onClick={handleSignupClick}>일기장 참여하기</CTAButton>
        </section>
      </div>
    </div>
  );
};
