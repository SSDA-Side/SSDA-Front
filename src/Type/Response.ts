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

type DiaryDetailImage = {
  id: number;
  imgUrl: string;
};
