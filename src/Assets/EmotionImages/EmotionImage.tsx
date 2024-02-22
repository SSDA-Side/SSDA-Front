import sprite from './sprites.png';
import backgroundSprite from './spritesBackground.png';

type EmotionType = 'angry' | 'happy' | 'eating' | 'sad' | 'excited' | 'fell_in_love' | 'sleeping' | 'normal' | 'bored';

export const emotionTypes: EmotionType[] = [
  'angry',
  'happy',
  'eating',
  'sad',
  'excited',
  'fell_in_love',
  'sleeping',
  'normal',
  'bored',
];

const SPRITE_IMAGE_WIDTH = 98;
const SPRITE_BACKGROUND_IMAGE_WIDTH = 52;

// const convertIndexToName = (index: number): EmotionType => emotionTypes[index];
const convertTypeToIndex = (type: EmotionType): number => emotionTypes.findIndex((emotionType) => emotionType === type);

type EmotionSize = 'lg' | 'sm';
type EmotionImage = { type?: EmotionType; index?: number; size?: EmotionSize };

export const EmotionImage = ({ type, index, size = 'lg' }: EmotionImage) => {
  if (type === undefined && index === undefined) {
    throw new Error('EmotionImage의 type prop 또는 index prop을 설정해야 합니다.');
  }

  const itemSize = size === 'lg' ? 98 : 48;
  const imageIndex = type ? convertTypeToIndex(type) : index || 0;
  const imagePositionX = SPRITE_IMAGE_WIDTH * imageIndex;

  return (
    <div
      style={{
        width: itemSize,
        height: itemSize,
        background: `url('${sprite}') -${imagePositionX}px -0`,
        backgroundSize: 'cover',
      }}
    />
  );
};

export const EmotionBackgroundImage = ({ type, index }: EmotionImage) => {
  if (type === undefined && index === undefined) {
    throw new Error('EmotionImage의 type prop 또는 index prop을 설정해야 합니다.');
  }

  const itemSize = 48;
  const imageIndex = type ? convertTypeToIndex(type) : index || 0;
  const imagePositionX = SPRITE_BACKGROUND_IMAGE_WIDTH * imageIndex;

  return (
    <div
      style={{
        width: itemSize,
        height: itemSize,
        background: `url('${backgroundSprite}') -${imagePositionX}px -0`,
        backgroundSize: 'cover',
      }}
    />
  );
};

// type EmotionItem = {
//   id: number;
//   name: EmotionType;
//   image: string;
//   description: string;
// };

// type EmotionDescription = {
//   [x in EmotionType]: string;
// };

// type EmotionImage = {
//   [x in EmotionType]: string;
// };

// const emotionDescriptions: EmotionDescription = {
//   angry: '아니 이렇게나 화가 날 수가!',
//   happy: '방긋 웃음이 나는 기쁜 하루네요!',
//   eating: '하루 종일 먹었어요!',
//   sad: '우울해서 위로받고 싶은 하루네요...',
//   excited: '오늘 기분 최최최상!!',
//   fell_in_love: '사랑에 빠져버렸어요~',
//   sleeping: '피곤해요... 집에 가고 싶어요...',
//   normal: '그저 그런 하루예요...',
//   bored: '오늘 너무... 따분해...',
// };

// const emotionImages: EmotionImage = {
//   angry: facial_angry,
//   happy: facial_happy,
//   eating: facial_eating,
//   sad: facial_sad,
//   excited: facial_excited,
//   fell_in_love: facial_fell_in_love,
//   sleeping: facial_sleeping,
//   normal: facial_normal,
//   bored: facial_bored,
// };

// const emotionTypes: EmotionType[] = [
//   'angry',
//   'happy',
//   'eating',
//   'sad',
//   'excited',
//   'fell_in_love',
//   'sleeping',
//   'normal',
//   'bored',
// ];

// export const emotionItems = emotionTypes.map(
//   (emotionName, index) =>
//     ({
//       id: index,
//       name: emotionName,
//       image: emotionImages[emotionName],
//       description: emotionDescriptions[emotionName],
//     }) as EmotionItem,
// );

// export const EmotionIcon = () => {
//   return <
// }
