import { axios } from './Axios';

/** Model */
import type { Board, Member, Notification } from '@Type/Model';

/** Request */
import type {
  CreateBoardeRequest,
  DeleteBoardRequest,
  GetMemberListRequest,
  ResignBoardRequest,
  UpdateBoardRequest,
} from '@Type/Request';

/** Response */
import type {
  CreateShareLinkResponse,
  GetNotificationResponse,
  GetShareLinkMetadataResponse,
  HeroData,
} from '@Type/Response';

import type { KakaoLoginResponse } from '@Type/index';

/** Test JSON */
import heroResponse from '@/TestResponse/board_hero_response.json';
import kakaoLoginResponse from '@/TestResponse/kakao_login_response.json';
import boardResponse from '@/TestResponse/board_list_response.json';
import memberResponse from '@/TestResponse/member_list_response.json';
import createShareLinkResponseJSON from '@/TestResponse/create_share_link_response.json';
import shareMetadataResponse from '@/TestResponse/get_share_link_response.json';
import notificationResponse from '@/TestResponse/notification_response.json';

type JSONResponseType = { [k in string]: unknown };
const JSONResponses: JSONResponseType = {
  '/api/auth/kakao': kakaoLoginResponse,
  '/api/boards/hero': heroResponse,
  '/api/boards': boardResponse,
  '/api/boards/member': memberResponse,
  '/api/boards/share': createShareLinkResponseJSON,
  '/api/boards/share/get': shareMetadataResponse,
  '/api/notification': notificationResponse,
};

const TEST_MODE = true;
const NETWORK_DELAY = 1200;

type RejectOptions =
  | {
      wouldReject?: false;
      errorCode?: number;
      errorMessage?: string;
    }
  | {
      wouldReject: true;
      errorCode: number;
      errorMessage: string;
    };

const fakeGet = (path: string, { wouldReject, errorCode, errorMessage }: RejectOptions) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (wouldReject) {
        reject({ errorCode, errorMessage });
      } else {
        resolve(JSONResponses[path]);
      }
    }, NETWORK_DELAY);
  });
};

const fakePost = (path: string, body: unknown, { wouldReject, errorCode, errorMessage }: RejectOptions) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (wouldReject) {
        reject({ errorCode, errorMessage });
      } else {
        resolve(JSONResponses[path] || undefined);
      }
    }, NETWORK_DELAY);
  });
};

export const kakaoLogin = async (authorizationCode: string) => {
  if (TEST_MODE) {
    return fakePost('/api/auth/kakao', { authorizationCode }, { wouldReject: false }) as Promise<KakaoLoginResponse>;
  }

  const res = await axios.post<KakaoLoginResponse>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getHeroData = async () => {
  if (TEST_MODE) {
    return fakeGet('/api/boards/hero', { wouldReject: false }) as Promise<HeroData>;
  }

  const res = await axios.get<HeroData>('/api/boards/hero');
  return res.data;
};

export const getBoardList = async () => {
  if (TEST_MODE) {
    return fakeGet('/api/boards', { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.get<Board[]>('/api/boards');
  return res.data;
};

export const createBoard = async (boardRequestForm: CreateBoardeRequest) => {
  if (TEST_MODE) {
    return fakePost('/api/boards', boardRequestForm, { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.post('/api/boards', boardRequestForm);
  return res.status;
};

export const updateBoard = async ({ id, ...boardRequestForm }: UpdateBoardRequest) => {
  if (TEST_MODE) {
    return fakePost('/api/boards', boardRequestForm, { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.put(`/api/boards/${id}`, boardRequestForm);
  return res.status;
};

export const deleteBoard = async ({ id }: DeleteBoardRequest) => {
  if (TEST_MODE) {
    return fakePost('/api/boards', id, { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.delete(`/api/boards/${id}`);
  return res.status;
};

export const resignBoard = async ({ id }: ResignBoardRequest) => {
  if (TEST_MODE) {
    return fakePost('/api/boards', id, { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.post(`/api/boards/${id}`);
  return res.status;
};

export const getMemberList = async ({ id }: GetMemberListRequest) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/member`, { wouldReject: false }) as Promise<Member[]>;
  }

  const res = await axios.get<Member[]>(`/api/boards/${id}/member`);
  return res.data;
};

export const createDiary = async ({ id: boardId }) => {
  if (TEST_MODE) {
    return fakeGet(`/api/diary`, { wouldReject: false }) as Promise<Member[]>;
  }

  const res = await axios.post(`/api/diary`);
  return res.status;
};

export const createShareLink = async ({ boardId }) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/share`, { wouldReject: false }) as Promise<CreateShareLinkResponse>;
  }

  const res = await axios.post<CreateShareLinkResponse>(`/api/board/${boardId}/share`);
  return res.data;
};

export const getShareLinkMetadata = async ({ hashKey }) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/share/get`, { wouldReject: false }) as Promise<GetShareLinkMetadataResponse>;
  }

  const res = await axios.post<GetShareLinkMetadataResponse>(`/api/share/${hashKey}`);
  return res.data;
};

export const getNotifications = async ({ pageSize, lastViewId }: { pageSize: number; lastViewId: number }) => {
  if (TEST_MODE) {
    const notifications = (await fakeGet(`/api/notification`, { wouldReject: false })) as Notification[];

    const isInitialFetching = +lastViewId === 0;
    const startIndex = isInitialFetching ? 0 : notifications.findIndex((noti) => noti.id === +lastViewId) + 1;

    const notis = notifications.slice(startIndex, startIndex + pageSize);

    return notis;

    // 이 아래건 react query에서 처리해주는 듯?
    // const hasNextPage = startIndex + pageSize < notifications.length;
    // const isLastPage = !hasNextPage;
    // const isLastPage = notis.length < pageSize || !hasNextPage; // hasNextPage가 true인데 notis가 pageSize보다 낮을 리가

    // return {
    //   hasNextPage,
    //   isLastPage,
    //   pages: notis,
    // } as GetNotificationResponse;
  }

  const res = await axios.post<Notification[]>(`/api/notification?pageSize=${pageSize}&lastViewId=${lastViewId}`);
  return res.data;
};
