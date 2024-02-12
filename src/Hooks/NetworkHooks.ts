import {
  createDiary,
  getAllDiary,
  getBoardList,
  getBoardMemberList,
  getHeroData,
  getMonth,
  getNewDiary,
  getTodayDiary,
  isNewDiary,
  kakaoLogin,
} from '@APIs/index';
import { setCookie } from '@Utils/Cookies';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useHeroData = () => {
  return useQuery({
    queryKey: ['myboard', 'hero'],
    queryFn: getHeroData,
  });
};

export const useBoardList = () => {
  return useQuery({
    queryKey: ['myboard', 'list'],
    queryFn: getBoardList,
  });
};

export const useBoardMemberList = ({ boardId }: { boardId: number }) => {
  return useQuery({
    queryKey: ['myboard', 'memberList'],
    queryFn: () => getBoardMemberList({ boardId }),
  });
};

export const useCreateDiary = () => {
  return useMutation({
    mutationKey: ['createDiary'],
    mutationFn: createDiary,
  });
};

export const useGetAllDiary = (boardId: number, pageSize: number, lastViewId: number) => {
  return useQuery({
    queryKey: ['myboard', 'diary'],
    queryFn: () => getAllDiary(boardId, pageSize, lastViewId),
  });
};

export const useIsNewDiary = (boardId: number) => {
  return useQuery({
    queryKey: ['myboard', 'isNewDiary'],
    queryFn: () => isNewDiary(boardId),
  });
};

export const useGetNewDiary = (boardId: number) => {
  return useQuery({
    queryKey: ['myboard', 'newDiary'],
    queryFn: () => getNewDiary(boardId),
  });
};

export const useGetTodayDiary = (boardId: number, date: string) => {
  return useMutation({
    mutationKey: ['myboard', 'today'],
    mutationFn: () => getTodayDiary(boardId, date),
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useGetMonth = (boardId: number, date: string) => {
  return useMutation({
    mutationKey: ['myboard', 'month'],
    mutationFn: () => getMonth(boardId, date),
    onSuccess: (data) => {
      return data.dataList;
    },
  });
};

export const useKaKaoLogin = (authorizationCode: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['kakao', 'login'],
    mutationFn: () => kakaoLogin(authorizationCode),
    onSuccess: (data) => {
      // const expirationTime = new Date();
      // expirationTime.setSeconds(expirationTime.getSeconds() + 1800);
      setCookie('accessToken', data['accessToken'], { path: '/' });
      localStorage.setItem('refreshToken', data['refreshToken']);
      navigate('/myboard');
    },
  });
};
