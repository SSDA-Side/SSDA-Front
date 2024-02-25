import { axios } from './Axios';

/** Model */
import type { Board, Member, Notification, NotificationBase } from '@Type/Model';

/** Request */
import type {
  CreateBoardRequest,
  CreateCommentRequest,
  CreateDiaryRequest,
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
  SignUpBoardRequest,
  UpdateBoardRequest,
  UpdateCommentRequest,
  updateUserInfoRequest,
  updateFontRequest,
  DeleteReplyRequest,
  UpdateDiaryRequest,
} from '@Type/Request';

/** Response */
import type {
  CommentData,
  CreateShareLinkResponse,
  DiaryDetailData,
  EmotionQuestion,
  GetShareLinkMetadataResponse,
  HeroMetadata,
  KakaoLoginData,
  likeData,
  replyData,
  todayDiaryData,
  userData,
} from '@Type/Response';

/** Test JSON */
import heroResponse from '@/TestResponse/board_hero_response.json';
import boardResponse from '@/TestResponse/board_list_response.json';
import createShareLinkResponseJSON from '@/TestResponse/create_share_link_response.json';
import shareMetadataResponse from '@/TestResponse/get_share_link_response.json';
import kakaoLoginResponse from '@/TestResponse/kakao_login_response.json';
import memberResponse from '@/TestResponse/member_list_response.json';
import notificationResponse from '@/TestResponse/notification_response.json';
import { getCookie } from '@Utils/Cookies';

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

const TEST_MODE = false;
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
      console.log(body);
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
    return fakePost('/api/auth/kakao', { authorizationCode }, { wouldReject: false }) as Promise<KakaoLoginData>;
  }

  const res = await axios.post<KakaoLoginData>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getHeroMetadata = async () => {
  if (TEST_MODE) {
    return fakeGet('/api/boards/hero', { wouldReject: false }) as Promise<HeroMetadata>;
  }

  const res = await axios.get<HeroMetadata>('/api/boards/hero');
  return res.data;
};

// diary
export const getBoardTitle = async ({ boardId }: { boardId: number }) => {
  const res = await axios.get(`/api/boards/title/${boardId}`);
  return res.data;
};

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

// const DELAY_TIME = 1200;

// 일기 상세
export const getDiaryDetail = async ({ memberId, boardId, date }: GetDiaryDetailRequest) => {
  const res = await axios.get<DiaryDetailData>(`/api/diary?memberId=${memberId}&boardId=${boardId}&date=${date}`);
  return res.data;
};

// ㅣike
export const getLikes = async ({ diaryId }: GetLikesRequest) => {
  const res = await axios.get<likeData[]>(`/api/diary/${diaryId}/likes`);
  return res.data;
};

export const updateLikes = async ({ diaryId }: GetLikesRequest) => {
  const res = await axios.post(`/api/diary/${diaryId}/likes`);
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

export const deleteReply = async ({ commentId, replyId }: DeleteReplyRequest) => {
  const res = await axios.delete(`/api/comment/${commentId}/reply/${replyId}`);
  return res.status;
};

// setting
export const getUser = async () => {
  // 쿠키 가져오기
  const token = getCookie('accessToken');
  const res = await axios.get<userData>(`/api/members/${token}`);
  return res.data;
};

// private MultipartFile profileUrl;
// private String nickname;
export const updateUser = async ({ profileUrl, nickname }: updateUserInfoRequest) => {
  const formData = new FormData();
  formData.append('profileUrl', profileUrl);
  formData.append('nickname', nickname);
  const res = await axios.post(`/api/members/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.status;
};

// private String qaContents;
// private int starPoint;
export const createQnA = async ({ qaContents, starPoint }: { qaContents: string; starPoint: number }) => {
  const res = await axios.post(`/api/setting`, { qaContents, starPoint });
  return res.status;
};

// private Long memberId;
// private int font;
export const updateFont = async ({ font, memberId }: updateFontRequest) => {
  const res = await axios.put(`/api/setting`, { font, memberId });
  return res.status;
};

/**
 * 인위적인 네트워크 딜레이를 위한 임시 함수
 * API가 연결되면 해당 함수는 불필요
 * */
// const fetchJSON = async <T>(path: string) => {
//   const response = await axios.get<T>(path);

//   return new Promise<T>((resolve) => {
//     setTimeout(() => {
//       resolve(response.data as T);
//     }, DELAY_TIME);
//   });
// };

export const getBoardList = async () => {
  if (TEST_MODE) {
    return fakeGet('/api/boards', { wouldReject: false }) as Promise<Board[]>;
  }

  const res = await axios.get<Board[]>('/api/boards');
  return res.data;
};

export const createBoard = async (boardRequestForm: CreateBoardRequest) => {
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

  const res = await axios.post(`/api/boards/${id}/resign`, {});
  return res.status;
};

export const signUpBoard = async ({ id }: SignUpBoardRequest) => {
  const res = await axios.post(`/api/boards/${id}/join`, {});
  return res.status;
};

export const getMemberList = async ({ id }: GetMemberListRequest) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/member`, { wouldReject: false }) as Promise<Member[]>;
  }

  const res = await axios.get<Member[]>(`/api/boards/${id}/members`);
  return res.data;
};

export const createDiary = async (submitData: CreateDiaryRequest) => {
  if (TEST_MODE) {
    return fakeGet(`/api/diary`, { wouldReject: false }) as Promise<Member[]>;
  }

  const res = await axios.postForm(`/api/diary`, submitData);
  return res.status;
};

export const updateDiary = async (submitData: UpdateDiaryRequest) => {
  const res = await axios.putForm(`/api/diary/${submitData.id}`, submitData);
  return res.status;
};

export const deleteDiary = async ({ diaryId }: { diaryId: number }) => {
  const res = await axios.delete(`/api/diary/${diaryId}`);
  return res.status;
};

export const createShareLink = async ({ boardId }: { boardId: number }) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/share`, { wouldReject: false }) as Promise<CreateShareLinkResponse>;
  }

  const res = await axios.post<CreateShareLinkResponse>(`/api/boards/${boardId}/share`);
  return res.data;
};

export const getShareLinkMetadata = async ({ hashKey }: { hashKey: string }) => {
  if (TEST_MODE) {
    return fakeGet(`/api/boards/share/get`, { wouldReject: false }) as Promise<GetShareLinkMetadataResponse>;
  }

  const res = await axios.get<GetShareLinkMetadataResponse>(`/api/boards/share/${hashKey}`);
  return res.data;
};

export const getNotifications = async ({ pageSize, lastViewId }: { pageSize: number; lastViewId: number }) => {
  if (TEST_MODE) {
    const notifications = (await fakeGet(`/api/notification`, { wouldReject: false })) as Notification[];

    const isInitialFetching = +lastViewId === 0;
    const startIndex = isInitialFetching ? 0 : notifications.findIndex((noti) => noti.id === +lastViewId) + 1;

    const notis = notifications.slice(startIndex, startIndex + pageSize);

    return notis;
  }

  const res = await axios.get<Notification[]>(`/api/notification?pageSize=${pageSize}&lastViewId=${lastViewId}`);
  return res.data;
};

export const readAllNotifications = async () => {
  const res = await axios.post<string>(`/api/notification`, {});
  return res.data;
};

// setting

export const getEmotionQuestion = async () => {
  const res = await axios.get<EmotionQuestion>(`/api/prediction/emotion`);
  return res.data;
};

export const readNotification = async ({ id, writerId }: Pick<NotificationBase, 'id' | 'writerId'>) => {
  const res = await axios.put<number>(`/api/notification/${id}`, { writerId });
  return res.status;
};
