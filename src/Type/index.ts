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
  | 'error';

export type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 1800
  grantType: 'Bearer';
};
