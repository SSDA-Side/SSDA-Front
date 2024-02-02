import { SocialLogin } from '@Components/SocialLogin';
import { BubbleImage, LoginImage } from '@Assets/LoginImages';
import styles from './LoginPage.module.scss';
import { useEffect, useState } from 'react';
import { SVGIcon } from '@Icons/SVGIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '@Utils/Cookies';

const Carousel = () => {
  const [currnet, setCurrent] = useState<number>(0);

  return (
    <div className={`${styles.carousel} ${styles[`carousel-${currnet}`]}`}>
      <div className={styles.carouselContainer}>
        {currnet === 2 ? (
          <div className={styles.carouselContent}>
            <h1>Dassda</h1>
            <h2>소중한 사람과 함께 일상을 공유해보세요!</h2>
          </div>
        ) : (
          <>
            <LoginImage index={currnet} />
            <BubbleImage index={currnet} />
          </>
        )}
      </div>
      <div className={styles.carouselButton}>
        {[0, 1, 2].map((index) => (
          <button onClick={() => setCurrent(index)} key={`name- ${index}`}>
            <SVGIcon name={index === currnet ? 'fill-circle' : 'empty-circle'} size={8} />
          </button>
        ))}
      </div>

      <div className={styles.loginContainer}>
        <SocialLogin />
      </div>
    </div>
  );
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/oauth/callback/kakao') return;
    if (getCookie('accessToken')) navigate('/myboard');
  }, [navigate, location.pathname]);
  return (
    <div className={styles.container}>
      <Carousel />
    </div>
  );
};
