import { axios } from './Axios';
import { Board, HeroData } from '@Type/index';
import { BoardMember } from '@Type/index';

export type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 1800
  grantType: 'Bearer';
};

export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post('/api/auth/kakao', { authorizationCode });
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

export const getHeroData = () => fetchJSON<HeroData>('/board_hero_response.json');
export const getBoardList = () => fetchJSON<Board[]>('/board_list_response.json');
export const getBoardMemberList = ({ boardId }: { boardId: number }) =>
  fetchJSON<BoardMember[]>('/member_list_response.json');
