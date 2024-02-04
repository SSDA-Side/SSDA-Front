import { axios } from './Axios';
import { Board, HeroData, KakaoLoginResponse } from '@Type/index';
import { BoardMember } from '@Type/index';

export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post<KakaoLoginResponse>('/api/auth/kakao', { authorizationCode });
  return res.data;
};

export const getMonth = async (boardId: number, date: string) => {
  const res = await axios.get(`/api/mode/month?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const getTodayDiary = async (boardId: number, date: string) => {
  const res = await axios.get(`/api/mode/day?boardId=${boardId}&date=${date}`);
  return res.data;
};

export const isNewDiary = async (boardId: number) => {
  const res = await axios.get(`/api/mode/exist?boardId=${boardId}`);
  return res.data;
};

const DELAY_TIME = 1200;

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

const fakePost = async (path: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Response(null, { status: 200 }));
    }, DELAY_TIME);
  });
};

export const getHeroData = () => fetchJSON<HeroData>('/board_hero_response.json');
export const getBoardList = () => fetchJSON<Board[]>('/board_list_response.json');
export const getBoardMemberList = ({ boardId }: { boardId: number }) =>
  fetchJSON<BoardMember[]>('/member_list_response.json');

export const createDiary = ({
  boardId,
  diaryTitle,
  contents,
  stickerId,
  diaryImgs,
}: {
  boardId: number;
  diaryTitle: string;
  contents: string;
  stickerId: number;
  diaryImgs: FileList;
}) => fakePost('/api/diary');
// export const createDiary = ({
//   boardId,
//   diaryTitle,
//   contents,
//   stickerId,
//   diaryImgs,
// }: {
//   boardId: number;
//   diaryTitle: string;
//   contents: string;
//   stickerId: number;
//   diaryImgs: FileList;
// }) => {
//   return axios.postForm(
//     'http://118.67.143.25:8080/api/diary',
//     { boardId, diaryTitle, contents, stickerId, diaryImgs },
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: 'Bearer BoakzEncfqqFsgxpTS4Ubyqw6OGjjRNChuDbKJZL9PrXgbn1bOBFLwIbGoEKKiVOAAABjUlp1XSi-KZYUq23DA',
//       },
//     },
//   );
// };
