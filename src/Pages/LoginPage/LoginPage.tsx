import { SocialLogin } from '@Components/SocialLogin';
import { LoginImage } from '@Assets/LoginImages';
import styles from './LoginPage.module.scss';
import { useEffect, useState } from 'react';
import { SVGIcon } from '@Icons/SVGIcon';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@Utils/Cookies';
import dassdaLogo from '@Assets/dassdaLogo.png';

const titleList = ['다양한 디자인 템플릿', '귀여운 기분 감정들', '같이 쓰는 일기'];
const explainList = [
  ['약 20여가지 디자인 중에', '마음에 드는 표지를 골라', '일기장을 만들어보세요!'],
  ['오늘 하루는 어땠는지', '기분 스티커로 표현해보세요!'],
  ['소중한 사람들과', '서로의 일상을 주고받아보세요!'],
];

// TODO: [feat] 3초마다
const Carousel = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className={`${styles.carousel} ${styles[`carousel-${current}`]}`}>
      <div className={styles.carouselContainer}>
        {current === 3 ? (
          <div className={styles.carouselContent}>
            <img src={dassdaLogo} alt="dassdaLogo" />
            <h2>소중한 사람과 함께 일상을 공유해보세요!</h2>
          </div>
        ) : (
          <>
            <div className={styles.imageContainer}>
              <LoginImage index={current} />
            </div>
            <div className={styles.contentContainer}>
              <h1>{titleList[current]}</h1>
              {explainList[current].map((text, index) => (
                <p key={`explain-${index}`}>{text}</p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.carouselButton}>
        {[0, 1, 2, 3].map((index) => (
          <button onClick={() => setCurrent(index)} key={`name- ${index}`}>
            <SVGIcon name={index === current ? 'fill-circle' : 'empty-circle'} size={8} />
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

  useEffect(() => {
    if (getCookie('accessToken')) navigate('/myboard');
  }, [navigate]);
  return (
    <div className={styles.container}>
      <Carousel />
    </div>
  );
};
