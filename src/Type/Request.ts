import type { Board } from './Model';

export type BoardFormData = Pick<Board, 'title' | 'imageNumber' | 'appearanceType'>;

export type CreateBoardeRequest = BoardFormData;
export type UpdateBoardRequest = Pick<Board, 'id'> & BoardFormData;
export type DeleteBoardRequest = Pick<Board, 'id'>;
export type ResignBoardRequest = Pick<Board, 'id'>;
export type GetMemberListRequest = Pick<Board, 'id'>;
