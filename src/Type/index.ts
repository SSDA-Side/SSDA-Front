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
  | 'send';

export type Board = {
  id: number;
  title: string;
  appearanceId: number;
  imageId: number;
  diaryCount: number;
  peopleCount: number;
};
