import { useEffect, useState } from 'react';

import kakaoLogo from '@Assets/LoginImages/kakao_logo.svg';
import styles from './LoginPage.module.scss';

import image1 from '@Assets/LoginImages/onboarding01.png';
import image2 from '@Assets/LoginImages/onboarding02.png';
import image3 from '@Assets/LoginImages/onboarding03.png';

import cn from 'classnames';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const onboardingDatas = [
  {
    id: 0,
    title: '다양한 디자인 템플릿',
    text: `약 20여가지 디자인 중에\n마음에 드는 표지를 골라\n일기장을 만들어보세요!`,
    image: image1,
  },
  {
    id: 1,
    title: '귀여운 기분 감정들',
    text: `오늘 하루는 어땠는지\n기분 스티커로 표현해보세요!`,
    image: image2,
  },
  {
    id: 2,
    title: '같이 쓰는 일기',
    text: `소중한 사람들과\n서로의 일상을 주고받아보세요!`,
    image: image3,
  },
];

export const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex((prev) => (prev < onboardingDatas.length - 1 ? prev + 1 : 0));
    }, 2500);

    return () => clearInterval(timerId);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('callbackUrl', '/myboard');
    window.location.href = kakaoLoginUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        <div className={styles.list} style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
          {onboardingDatas.map(({ id, image, title, text }) => (
            <div key={id} className={styles.content}>
              <div className={styles.imgWrapper}>
                <img src={image} />
              </div>

              <h2>{title}</h2>
              <p className={styles.description}>{text}</p>
            </div>
          ))}
        </div>

        <ul className={styles.nav}>
          {onboardingDatas.map((onboardingData) => (
            <li
              key={onboardingData.id}
              className={cn(styles.navItem, { [styles.selected]: currentIndex === onboardingData.id })}
            />
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <button className={styles.kakaoLoginButton} onClick={handleLogin}>
          <img src={kakaoLogo} alt="kakaoLogo" />
          카카오로 시작하기
        </button>
      </div>
    </div>
  );
};
