import type { Board, Diary, Member, Notification } from './Model';

/** 무한스크롤 응답 */
// export type InfiniteResponse<T> = {
//   lastViewId: number;
//   list: T;
// };

/** 히어로 */
export type HeroMetadata = {
  hasSharedBoard: boolean;
  hasNewNotification: boolean;
} & Pick<Board, 'memberCount' | 'diaryCount'> &
  Pick<Member, 'nickname'>;

/** 공유 링크  */
export type CreateShareLinkResponse = {
  shareLink: string;
};

export type GetShareLinkMetadataResponse = {
  nickname: string;
  profileUrl: string;
  boardId: number;
  boardTitle: string;
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
  timeStamp: string;
};

export type DiaryDetailImage = {
  id: number;
  imgUrl: string;
};

export type KakaoLoginData = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 1800
  grantType: 'Bearer';
};

export type CommentData = {
  id: number;
  nickname: string;
  profileUrl: string;
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
  selectedDate: string;
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

export type EmotionQuestion = {
  emotionContent: string;
};
