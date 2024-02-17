import type { Board, Diary } from './Model';

export type BoardFormData = Pick<Board, 'title' | 'imageNumber' | 'appearanceType'>;

export type CreateBoardeRequest = BoardFormData;
export type UpdateBoardRequest = Pick<Board, 'id'> & BoardFormData;
export type DeleteBoardRequest = Pick<Board, 'id'>;
export type ResignBoardRequest = Pick<Board, 'id'>;
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
export type GetReplyRequest = Pick<Diary, 'commentId' | 'lastViewId'>;
export type CreateReplyRequest = Pick<Diary, 'commentId' | 'contents'>;
