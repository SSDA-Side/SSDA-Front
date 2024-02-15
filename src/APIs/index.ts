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
import { CommentData, replyData, type DiaryDetailData, type HeroData, todayDiaryData } from '@Type/Response';

import type { KakaoLoginResponse } from '@Type/index';

// login
export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post<KakaoLoginResponse>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getHeroData = async () => {
  const res = await axios.get<HeroData>('/api/boards/hero');
  return res.data;
};

// diary
export const getMonth = async (boardId: number, date: string) => {
  const res = await axios.get(`/api/mode/month?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const getTodayDiary = async (boardId: number, date: string) => {
  const res = await axios.get<todayDiaryData[]>(`/api/mode/day?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const isNewDiary = async (boardId: number) => {
  const res = await axios.get(`/api/mode/exist?boardId=${boardId}`);
  return res.data;
};

export const getAllDiary = async (boardId: number, pageSize = 10, lastViewId: number) => {
  const res = await axios.get(`/api/mode/all?boardId=${boardId}&pageSize=${pageSize}&lastViewId=${lastViewId}`);
  return res.data;
};

export const getNewDiary = async (boardId: number) => {
  const res = await axios.get(`/api/mode/new?boardId=${boardId}`);
  return res.data;
};

const DELAY_TIME = 1200;

// 일기 상세
export const getDiaryDetail = async (memberId: number, boardId: number, date: string) => {
  const res = await axios.get<DiaryDetailData>(`/api/diary?memberId=${memberId}&boardId=${boardId}&date=${date}`);
  return res.data;
};

// ㅣike
export const getLikes = async (diaryId: number) => {
  const res = await axios.get(`/api/diary/${diaryId}/likes`);
  return res.data;
};

export const updateLikes = async (diaryId: number) => {
  const res = await axios.put(`/api/diary/${diaryId}/likes`);
  return res.status;
};

// comment
export const getComment = async (diaryId: number, pageSize = 10, lastViewId: number) => {
  const res = await axios.get<CommentData>(
    `/api/diary/${diaryId}/comment?pageSize=${pageSize}&lastViewId=${lastViewId}`,
  );
  return res.data;
};

export const updateComment = async (diaryId: number, commentId: number) => {
  const res = await axios.put(`/api/diary/${diaryId}/comment/${commentId}`);
  return res.status;
};

export const deleteComment = async (diaryId: number, commentId: number) => {
  const res = await axios.delete(`/api/diary/${diaryId}/comment/${commentId}`);
  return res.status;
};

export const createComment = async (diaryId: number, contents: string) => {
  const res = await axios.post(`/api/diary/${diaryId}/comment`, { contents });
  return res.status;
};
export const getReply = async (commentId: number, lastViewId: number) => {
  const res = await axios.get<replyData>(`/api/comment/${commentId}/reply?lastViewId=${lastViewId}`);
  return res.data;
};

export const createReply = async (commentId: number, contents: string) => {
  const res = await axios.post(`/api/comment/${commentId}/reply`, { contents });
  return res.status;
};

/**
 * 인위적인 네트워크 딜레이를 위한 임시 함수
 * API가 연결되면 해당 함수는 불필요
 * */
const fetchJSON = async <T>(path: string) => {
  const response = await axios.get<T>(path);

  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(response.data as T);
    }, DELAY_TIME);
  });
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
