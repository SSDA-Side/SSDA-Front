import type { Board, Member } from './Model';

export type HeroData = {
  hasSharedBoard: boolean;
} & Pick<Board, 'memberCount' | 'diaryCount'> &
  Pick<Member, 'nickname'>;

export type DiaryDetailData = {
  commentCount: number;
  contents: string;
  emotionId: number;
  id: number;
  images: DiaryDetailImage[];
  likeCount: number;
  memberId: number;
  nickname: string;
  owned: boolean;
  profileUrl: string;
  regDate: string;
  selectDate: string;
  title: string;
};

export type DiaryDetailImage = {
  id: number;
  imgUrl: string;
};

export type CommentData = {
  id: number;
  nickname: string;
  profilUrl: string;
  contents: string;
  regDate: string;
  owned: boolean;
  deletedMark: boolean;
}[];

export type replyData = CommentData;

export type todayDiaryData = {
  id: number;
  memberId: number;
  nickname: string;
  boardId: number;
  emotionId: number;
  thumbnailUrl: string;
  title: string;
  likeCount: number;
  commentCount: number;
  regDate?: string;
  selectedDate?: string;
  selectDate?: string;
  timeStamp: string;
};

export type userData = {
  id: number;
  email?: string;
  nickname: string;
  gender?: string;
  age_range?: string;
  profile_image_url: string;
  birthday?: string;
  font: string;
  enabled: boolean;
  accountNonLocked?: boolean;
  oauthProvider?: string;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  authorities?: string[];
  username: string;
  password?: null;
};
