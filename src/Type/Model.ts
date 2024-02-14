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

export interface NotificationBase {
  id: number;
  isRead: boolean;
  regDate: Date;
}

export type NotificationComment = {
  notificationTypeId: 1;
  boardId: number;
  diaryId: number;
  commentId: number;
  commentContents: string;
  commentWriterNickname: string;
} & NotificationBase;

export type NotificationReply = {
  notificationTypeId: 2;
  boardId: number;
  diaryId: number;
  commentId: number;
  replyId: number;
  replyWriterNickname: string;
  replyContents: string;
} & NotificationBase;

export type NotificationLike = {
  notificationTypeId: 3;
  boardId: number;
  diaryId: number;
  likeId: number;
  likeMemberNickname: string;
} & NotificationBase;

export type NotificationNewDiary = {
  notificationTypeId: 4;
  boardId: number;
  boardTitle: string;
  diaryId: number;
} & NotificationBase;

export type NotificationNewMember = {
  notificationTypeId: 5;
  boardId: number;
  boardTitle: string;
} & NotificationBase;

export type Notification =
  | NotificationComment
  | NotificationReply
  | NotificationLike
  | NotificationNewDiary
  | NotificationNewMember;
