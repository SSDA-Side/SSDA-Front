export interface Board {
  id: number;
  imageNumber: number;
  diaryCount: number;
  title: string;
  appearanceType: number;
  memberCount: number;
  regDate: Date;
  newBadge: boolean;
  backUp: boolean;
  shared: boolean;
}

export interface Member {
  id: number;
  profileUrl: string;
  nickname: string;
  signedDate: Date | number;
}
