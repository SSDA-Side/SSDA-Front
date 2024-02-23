export interface Member {
  id: number;
  profileUrl: string | File;
  nickname: string;
  regDate: Date | number;
}

export interface Setting {
  email: string;
  font: number;
  memberId: number;
  profileUrl: string | File;
  nickname: string;
  username: string;
  regDate: Date | number;
}

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

export interface Diary {
  id: number;
  diaryId: number;
  replyId: number;
  writer: Pick<Member, 'nickname' | 'profileUrl'>;
  emotionId: number;
  title: string;
  contents: string;
  likeCount: number;
  commentCount: number;
  isOwned: boolean;
  images?: ContentImage[];
  commentList?: Comment[];
}

export interface CommentBase {
  nickname: string;
  profileUrl: string;
  contents: string;
  regDate: Date;
  isOwned: boolean;
}

export interface Comment extends CommentBase {
  id: number;
  replyList?: Reply[];
}

export interface Reply extends CommentBase {
  id: number;
}
export interface ContentImage {
  id: string;
  imageUrl: string;
}

export interface NotificationBase {
  id: number;
  writerId: number;
  isRead: boolean;
  regDate: string;
}

export interface NotificationComment extends NotificationBase {
  notificationTypeId: 1;
  boardId: number;
  diaryId: number;
  commentId: number;
  commentContents: string;
  commentWriterNickname: string;
}

export interface NotificationReply extends NotificationBase {
  notificationTypeId: 2;
  boardId: number;
  diaryId: number;
  commentId: number;
  replyId: number;
  replyWriterNickname: string;
  replyContents: string;
}

export interface NotificationLike extends NotificationBase {
  notificationTypeId: 3;
  boardId: number;
  diaryId: number;
  likeId: number;
  likeMemberNickname: string;
}

export interface NotificationNewDiary extends NotificationBase {
  notificationTypeId: 4;
  boardId: number;
  boardTitle: string;
  diaryId: number;
}

export interface NotificationNewMember extends NotificationBase {
  notificationTypeId: 5;
  boardId: number;
  boardTitle: string;
}

export type Notification =
  | NotificationComment
  | NotificationReply
  | NotificationLike
  | NotificationNewDiary
  | NotificationNewMember;

export interface Diary {
  boardId: number;
  memberId: number;
  diaryId: number;
  commentId: number;
  date: string;
  lastViewId: number;
  pageSize: number;
  contents: string;
}
