import type { Board, Member } from './Model';

export type HeroData = {
  hasSharedBoard: boolean;
} & Pick<Board, 'memberCount' | 'diaryCount'> &
  Pick<Member, 'nickname'>;

export type CreateShareLinkResponse = {
  link: string;
};

export type GetShareLinkMetadataResponse = {
  memberId: number;
  username: string;
  profileUrl: string;
  boardId: number;
  title: string;
};
