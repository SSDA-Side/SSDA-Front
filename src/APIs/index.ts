import { axios } from './Axios';

/** Model */
import type { Board, Member } from '@Type/Model';

/** Request */
import type {
  CreateBoardeRequest,
  DeleteBoardRequest,
  GetMemberListRequest,
  ResignBoardRequest,
  UpdateBoardRequest,
} from '@Type/Request';

/** Response */
import type { HeroData } from '@Type/Response';

import type { KakaoLoginResponse } from '@Type/index';

export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post<KakaoLoginResponse>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getHeroData = async () => {
  const res = await axios.get<HeroData>('/api/boards/hero');
  return res.data;
};

export const getBoardList = async () => {
  const res = await axios.get<Board[]>('/api/boards');
  return res.data;
};

export const createBoard = async (boardRequestForm: CreateBoardeRequest) => {
  const res = await axios.post('/api/boards', boardRequestForm);
  return res.status;
};

export const updateBoard = async ({ id, ...boardReuestForm }: UpdateBoardRequest) => {
  const res = await axios.put(`/api/boards/${id}`, boardReuestForm);
  return res.status;
};

export const deleteBoard = async ({ id }: DeleteBoardRequest) => {
  const res = await axios.delete(`/api/boards/${id}`);
  return res.status;
};

export const resignBoard = async ({ id }: ResignBoardRequest) => {
  const res = await axios.post(`/api/boards/${id}`);
  return res.status;
};

export const getMemberList = async ({ id }: GetMemberListRequest) => {
  const res = await axios.get<Member[]>(`/api/boards/${id}/member`);
  return res.data;
};

export const createDiary = async ({ id: boardId }) => {
  const res = await axios.post(`/api/diary`);
  return res.status;
};
