export type IconName =
  | 'menu'
  | 'exit'
  | 'right'
  | 'left'
  | 'close'
  | 'edit'
  | 'user'
  | 'header/bell'
  | 'more'
  | 'users'
  | 'send'
  | 'empty-circle'
  | 'fill-circle';

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
