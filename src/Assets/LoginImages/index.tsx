import love from './login_love.png';
import book from './login_book.png';
import bubbleOne from './login_bubble01.png';
import bubbleTwo from './login_bubble02.png';

type LoginImageProps = {
  index: number;
};

export const LoginImage = ({ index }: LoginImageProps) => {
  const loginImage = [book, love];
  return <img src={loginImage[index]} alt="login-carousel-image" style={{ width: '185px', height: '185px' }} />;
};

export const BubbleImage = ({ index }: LoginImageProps) => {
  const bubbleImage = [bubbleOne, bubbleTwo];
  return (
    <img
      src={bubbleImage[index]}
      alt="login-carousel-bubble"
      style={{ width: '313px', height: '153px', marginLeft: '1rem' }}
    />
  );
};
