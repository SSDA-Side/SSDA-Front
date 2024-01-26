export type IconName =
  | 'menu'
  | 'right'
  | 'left'
  | 'close'
  | 'edit'
  | 'user'
  | 'users'
  | 'bell'
  | 'bell_new'
  | 'more'
  | 'send'
  | 'exit'
  | 'trash'
  | 'image'
  | 'sunny'
  | 'clock';

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
