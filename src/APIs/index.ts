import { axios } from './Axios';

/** Model */
import type { Board, Member } from '@Type/Model';

/** Request */
import type {
  CreateBoardeRequest,
  CreateCommentRequest,
  CreateReplyRequest,
  DeleteBoardRequest,
  DeleteCommentRequest,
  GetAllDiaryRequest,
  GetCommentRequest,
  GetDiaryDetailRequest,
  GetLikesRequest,
  GetMemberListRequest,
  GetMonthRequest,
  GetReplyRequest,
  IsNewDiaryRequest,
  ResignBoardRequest,
  UpdateBoardRequest,
  UpdateCommentRequest,
} from '@Type/Request';

/** Response */
import {
  CommentData,
  replyData,
  type DiaryDetailData,
  type HeroData,
  todayDiaryData,
  userData,
  KakaoLoginData,
} from '@Type/Response';

import { getCookie } from '@Utils/Cookies';

// login
export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post<KakaoLoginData>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getHeroData = async () => {
  const res = await axios.get<HeroData>('/api/boards/hero');
  return res.data;
};

// diary
export const getMonth = async ({ boardId, date }: GetMonthRequest) => {
  const res = await axios.get(`/api/mode/month?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const getTodayDiary = async ({ boardId, date }: GetMonthRequest) => {
  const res = await axios.get<todayDiaryData[]>(`/api/mode/day?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const updateRead = async ({ boardId }: IsNewDiaryRequest) => {
  const res = await axios.post(`/api/mode/read?boardId=${boardId}`);
  return res.status;
};

export const isNewDiary = async ({ boardId }: IsNewDiaryRequest) => {
  const res = await axios.get(`/api/mode/exist?boardId=${boardId}`);
  return res.data;
};

export const getAllDiary = async ({ boardId, pageSize = 10, lastViewId }: GetAllDiaryRequest) => {
  const res = await axios.get<todayDiaryData[]>(
    `/api/mode/all?boardId=${boardId}&pageSize=${pageSize}&lastViewId=${lastViewId}`,
  );
  return res.data;
};

export const getNewDiary = async ({ boardId }: IsNewDiaryRequest) => {
  const res = await axios.get<todayDiaryData[]>(`/api/mode/new?boardId=${boardId}`);
  return res.data;
};

const DELAY_TIME = 1200;

// 일기 상세
export const getDiaryDetail = async ({ memberId, boardId, date }: GetDiaryDetailRequest) => {
  const res = await axios.get<DiaryDetailData>(`/api/diary?memberId=${memberId}&boardId=${boardId}&date=${date}`);
  return res.data;
};

// ㅣike
export const getLikes = async ({ diaryId }: GetLikesRequest) => {
  const res = await axios.get(`/api/diary/${diaryId}/likes`);
  return res.data;
};

export const updateLikes = async ({ diaryId }: GetLikesRequest) => {
  const res = await axios.put(`/api/diary/${diaryId}/likes`);
  return res.status;
};

// comment
export const getComment = async ({ diaryId, pageSize = 10, lastViewId }: GetCommentRequest) => {
  const res = await axios.get<CommentData>(
    `/api/diary/${diaryId}/comment?pageSize=${pageSize}&lastViewId=${lastViewId}`,
  );
  return res.data;
};

export const updateComment = async ({ diaryId, commentId, contents }: UpdateCommentRequest) => {
  const res = await axios.put(`/api/diary/${diaryId}/comment/${commentId}`, { contents });
  return res.status;
};

export const deleteComment = async ({ diaryId, commentId }: DeleteCommentRequest) => {
  const res = await axios.delete(`/api/diary/${diaryId}/comment/${commentId}`);
  return res.status;
};

export const createComment = async ({ diaryId, contents }: CreateCommentRequest) => {
  const res = await axios.post(`/api/diary/${diaryId}/comment`, { contents });
  return res.status;
};
export const getReply = async ({ commentId, lastViewId }: GetReplyRequest) => {
  const res = await axios.get<replyData>(`/api/comment/${commentId}/reply?lastViewId=${lastViewId}`);
  return res.data;
};

export const createReply = async ({ commentId, contents }: CreateReplyRequest) => {
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

// setting
export const getUser = async () => {
  // 쿠키 가져오기
  const token = getCookie('accessToken');
  const res = await axios.get<userData>(`/api/members/${token}`);
  return res.data;
};
