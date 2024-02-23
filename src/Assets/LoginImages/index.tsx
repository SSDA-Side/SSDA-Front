import onboard01 from './onboarding01.png';
import onboard02 from './onboarding02.png';
import onboard03 from './onboarding03.png';
import cn from 'classnames';
import styles from './LoginImages.module.scss';

type LoginImageProps = {
  index: number;
};

export const LoginImage = ({ index }: LoginImageProps) => {
  const loginImage = [onboard01, onboard02, onboard03];
  return (
    <img
      src={loginImage[index]}
      alt="login-carousel-image"
      className={cn({
        [styles.frist]: index === 0,
        [styles.second]: index === 1,
        [styles.third]: index === 2,
      })}
    />
  );
};
