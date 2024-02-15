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
