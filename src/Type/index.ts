export type IconName =
  | 'menu'
  | 'right'
  | 'left'
  | 'close'
  | 'edit'
  | 'user'
  | 'users'
  | 'send'
  | 'empty-circle'
  | 'fill-circle'
  | 'bell'
  | 'bell_new'
  | 'more'
  | 'send'
  | 'exit'
  | 'trash'
  | 'image'
  | 'sunny'
  | 'clock'
  | 'check'
  | 'setting'
  | 'comment'
  | 'love';

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

export type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 1800
  grantType: 'Bearer';
};
