import type { Board, Diary, Member, Notification } from './Model';

/** 무한스크롤 응답 */
// export type InfiniteResponse<T> = {
//   lastViewId: number;
//   list: T;
// };

/** 히어로 */
export type HeroMetadata = {
  hasSharedBoard: boolean;
} & Pick<Board, 'memberCount' | 'diaryCount'> &
  Pick<Member, 'nickname'>;

/** 공유 링크  */
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

/** 알림 */
export type GetNotificationResponse = {
  hasNextPage: boolean;
  isLastPage: boolean;
  pages: Notification[];
};

/** 일기 */
export type GetDiaryResponse = {
  currentDate: Date;
  diaryList: Diary[];
};
