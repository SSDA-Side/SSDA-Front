import {
  createBoard,
  createComment,
  createDiary,
  deleteBoard,
  getAllDiary,
  getBoardList,
  getComment,
  getDiaryDetail,
  getHeroData,
  getMemberList,
  getMonth,
  getNewDiary,
  getTodayDiary,
  isNewDiary,
  kakaoLogin,
  updateBoard,
} from '@APIs/index';
import { GetMemberListRequest } from '@Type/Request';
import { setCookie } from '@Utils/Cookies';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useHeroData = () => {
  return useSuspenseQuery({
    queryKey: ['myboard', 'hero'],
    queryFn: getHeroData,
  });
};

export const useBoardList = () => {
  return useSuspenseQuery({
    queryKey: ['myboard', 'list'],
    queryFn: getBoardList,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBoard'],
    mutationFn: createBoard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'list'] });
    },
  });
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBoard'],
    mutationFn: updateBoard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'list'] });
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: deleteBoard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'list'] });
    },
  });
};

export const useGetComment = (diaryId: number, lastViewId: number) => {
  return useMutation({
    mutationKey: ['getComment'],
    mutationFn: () => getComment(diaryId, 10, lastViewId),
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useCreateComment = (diaryId: number, contents: string) => {
  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: () => createComment(diaryId, contents),
  });
};

export const useGetMemberList = ({ id }: GetMemberListRequest) => {
  return useSuspenseQuery({
    queryKey: ['myboard', 'memberList'],
    queryFn: () => getMemberList({ id }),
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

export const useGetDiaryDetail = (memberId: number, boardId: number, date: string) => {
  return useQuery({
    queryKey: ['myboard', 'diaryDetail'],
    queryFn: () => getDiaryDetail(memberId, boardId, date),
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
