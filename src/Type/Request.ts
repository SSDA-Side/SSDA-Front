import type { Board, Diary, Setting } from './Model';

/** 일기장 */
export type BoardFormData = Pick<Board, 'title' | 'imageNumber' | 'appearanceType'>;

export type CreateBoardRequest = BoardFormData;
export type UpdateBoardRequest = Pick<Board, 'id'> & BoardFormData;
export type DeleteBoardRequest = Pick<Board, 'id'>;
export type ResignBoardRequest = Pick<Board, 'id'>;
export type SignUpBoardRequest = Pick<Board, 'id'>;

/** 일기 */
export type DiaryFormData = {
  boardId: number;
  selectedDate: string;
  images: File[];
  uploadedImageIds: number[];
} & Pick<Diary, 'emotionId' | 'title' | 'contents'>;

export type CreateDiaryRequest = DiaryFormData;
export type UpdateDiaryRequest = Pick<Diary, 'id'> & DiaryFormData;
export type GetDiaryRequest = Pick<Diary, 'id'>;
export type DeleteDiaryRequest = Pick<Diary, 'diaryId'>;

/** 일기장 멤버 조회 */
export type GetMemberListRequest = Pick<Board, 'id'>;

export type GetMonthRequest = Pick<Diary, 'boardId' | 'date'>;
export type IsNewDiaryRequest = Pick<Diary, 'boardId'>;
export type GetAllDiaryRequest = Pick<Diary, 'boardId' | 'pageSize' | 'lastViewId'>;
export type GetDiaryDetailRequest = Pick<Diary, 'memberId' | 'boardId' | 'date'>;
export type GetLikesRequest = Pick<Diary, 'diaryId'>;
export type GetCommentRequest = Pick<Diary, 'diaryId' | 'pageSize' | 'lastViewId'>;
export type UpdateCommentRequest = Pick<Diary, 'diaryId' | 'commentId' | 'contents'>;
export type DeleteCommentRequest = Pick<Diary, 'diaryId' | 'commentId'>;
export type CreateCommentRequest = Pick<Diary, 'diaryId' | 'contents'>;
export type GetReplyRequest = Pick<Diary, 'commentId' | 'lastViewId' | 'pageSize'>;
export type DeleteReplyRequest = Pick<Diary, 'commentId' | 'replyId'>;
export type CreateReplyRequest = Pick<Diary, 'commentId' | 'contents'>;
export type updateUserInfoRequest = Pick<Setting, 'nickname' | 'profileUrl'>;
export type updateFontRequest = Pick<Setting, 'font' | 'memberId'>;
