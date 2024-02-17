import type { Board, Diary } from './Model';

/** 일기장 */
export type BoardFormData = Pick<Board, 'title' | 'imageNumber' | 'appearanceType'>;

export type CreateBoardRequest = BoardFormData;
export type UpdateBoardRequest = Pick<Board, 'id'> & BoardFormData;
export type DeleteBoardRequest = Pick<Board, 'id'>;
export type ResignBoardRequest = Pick<Board, 'id'>;

/** 일기 */
export type DiaryFormData = {
  boardId: number;
  selectedDate: Date;
  images: FileList;
} & Pick<Diary, 'emotionId' | 'title' | 'contents'>;

export type CreateDiaryRequest = DiaryFormData;
export type UpdateDiaryRequest = Pick<Diary, 'id'> & DiaryFormData;
export type DeleteDiaryRequest = Pick<Diary, 'id'>;
export type GetDiaryRequest = Pick<Diary, 'id'>;

/** 일기장 멤버 조회 */
export type GetMemberListRequest = Pick<Board, 'id'>;
