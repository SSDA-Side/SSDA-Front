export type IconName =
  | 'menu'
  | 'right'
  | 'left'
  | 'close'
  | 'edit'
  | 'user'
  | 'users'
  | 'send'
  | 'add'
  | 'empty-circle'
  | 'fill-circle'
  | 'bell'
  | 'bell_new'
  | 'more'
  | 'send'
  | 'exit'
  | 'star'
  | 'empty-star'
  | 'trash'
  | 'image'
  | 'sunny'
  | 'clock'
  | 'check'
  | 'setting'
  | 'error'
  | 'kakaotalk'
  | 'link'
  | 'comment'
  | 'camera'
  | 'writepen'
  | 'openbook'
  | 'calendar'
  | 'empty-heart'
  | 'love'
  | 'empty-love';

export type HeroData = {
  username: string;
  sharedPeopleCount: number;
  sharedDiaryCount: number;
};

export type Board = {
  id: number;
  title: string;
  appearanceId: number;
  imageId: number;
  diaryCount: number;
  peopleCount: number;
};

export type BoardMember = {
  id: number;
  profileUrl: string;
  name: string;
  signedDate: Date | number;
};

export type KakaoLoginData = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 1800
  grantType: 'Bearer';
};
