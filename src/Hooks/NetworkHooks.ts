import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  createBoard,
  createComment,
  createDiary,
  createReply,
  deleteBoard,
  getAllDiary,
  getBoardList,
  getHeroMetadata,
  getMemberList,
  getNotifications,
  getComment,
  getDiaryDetail,
  getMonth,
  getNewDiary,
  getReply,
  getTodayDiary,
  getUser,
  isNewDiary,
  kakaoLogin,
  updateBoard,
  updateRead,
} from '@APIs/index';
import { GetMemberListRequest } from '@Type/Request';
import { setCookie } from '@Utils/Cookies';
import { useNavigate } from 'react-router-dom';

export const useHeroMetadata = () => {
  return useSuspenseQuery({
    queryKey: ['myboard', 'hero'],
    queryFn: getHeroMetadata,
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

// comment
export const useGetComment = (diaryId: number, lastViewId: number) => {
  return useMutation({
    mutationKey: ['getComment'],
    mutationFn: () => getComment({ diaryId, pageSize: 10, lastViewId }),
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useCreateComment = (diaryId: number, contents: string) => {
  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: () => createComment({ diaryId, contents }),
  });
};

export const useGetReply = (commentId: number, lastViewId: number) => {
  return useMutation({
    mutationKey: ['getReply'],
    mutationFn: () => getReply({ commentId, lastViewId }),
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useCreateReply = (commentId: number, contents: string) => {
  return useMutation({
    mutationKey: ['createReply'],
    mutationFn: () => createReply({ commentId, contents }),
  });
};

// diary
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

export const useCreateShareLink = () => {
  return useMutation({
    mutationKey: ['createShareLink'],
    mutationFn: createShareLink,
  });
};

export const useGetShareLinkMetadata = () => {
  return useMutation({
    mutationKey: ['getShareLinkMetadata'],
    mutationFn: getShareLinkMetadata,
  });
};

export const useGetNotifications = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['getInfiniteNotification'],
    queryFn: ({ pageParam }) => getNotifications({ pageSize: 10, lastViewId: pageParam }),
    getNextPageParam: (lastPage) => {
      // 해당 코드 제가 임의로 수정했습니다. 후에 주현님이 수정하시면 될 것 같아요!
      if (lastPage === undefined) return undefined;
      const isLastPage = lastPage.length < 10;
      return isLastPage ? undefined : lastPage[lastPage.length - 1].id;
    },
    initialPageParam: 0,
  });
};

export const useUpdateRead = (boardId: number) => {
  return useMutation({
    mutationKey: ['myboard', 'updateRead'],
    mutationFn: () => updateRead({ boardId }),
    onSuccess: (data) => {
      console.log('success', data);
    },
  });
};

export const useGetAllDiary = (boardId: number, pageSize: number, lastViewId: number) => {
  return useQuery({
    queryKey: ['myboard', 'diary'],
    queryFn: () => getAllDiary({ boardId, pageSize, lastViewId }),
  });
};

export const useIsNewDiary = (boardId: number) => {
  return useQuery({
    queryKey: ['myboard', 'isNewDiary'],
    queryFn: () => isNewDiary({ boardId }),
  });
};

export const useGetNewDiary = (boardId: number) => {
  return useQuery({
    queryKey: ['myboard', 'newDiary'],
    queryFn: () => getNewDiary({ boardId }),
  });
};

export const useGetTodayDiary = (boardId: number, date: string) => {
  return useMutation({
    mutationKey: ['myboard', 'today'],
    mutationFn: () => getTodayDiary({ boardId, date }),
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useGetDiaryDetail = (memberId: number, boardId: number, date: string) => {
  return useQuery({
    queryKey: ['myboard', 'diaryDetail'],
    queryFn: () => getDiaryDetail({ memberId, boardId, date }),
  });
};

export const useGetMonth = (boardId: number, date: string) => {
  return useMutation({
    mutationKey: ['myboard', 'month'],
    mutationFn: () => getMonth({ boardId, date }),
    onSuccess: (data) => {
      return data.dataList;
    },
  });
};

// login
export const useKaKaoLogin = (authorizationCode: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['kakao', 'login'],
    mutationFn: () => kakaoLogin(authorizationCode),
    onSuccess: (data) => {
      // const expirationTime = new Date();
      // expirationTime.setSeconds(expirationTime.getSeconds() + 1800);
      setCookie('accessToken', data['accessToken'], { path: '/' });
      navigate('/myboard');
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['myboard', 'member'],
    queryFn: getUser,
  });
};
