import { SocialLogin } from '@Components/SocialLogin';
import { BubbleImage, LoginImage } from '@Assets/LoginImages';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { SVGIcon } from '@Icons/SVGIcon';

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
  // TODO : 로그인이 되어 있는 상태이면 로그인 페이지로 이동하지 않고, 메인 페이지로 이동
  // useEffect 사용 시 충돌이 일어남
  return (
    <div className={styles.container}>
      <Carousel />
    </div>
  );
};
