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
  createShareLink,
  createReply,
  deleteBoard,
  getAllDiary,
  getBoardList,
  getHeroMetadata,
  getMemberList,
  getNotifications,
  getShareLinkMetadata,
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
  updateUser,
  updateFont,
  createQnA,
  deleteDiary,
  getLikes,
  updateLikes,
  resignBoard,
  signUpBoard,
  getEmotionQuestion,
  readAllNotifications,
} from '@APIs/index';
import { GetMemberListRequest, SignUpBoardRequest } from '@Type/Request';
import { setCookie } from '@Utils/Cookies';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

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

export const useResignBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['resignBoard'],
    mutationFn: resignBoard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'list'] });
    },
  });
};

export const useSignUpBoard = () => {
  const queryClient = useQueryClient();

  return useMutation<number, AxiosError<{ message: string }>, SignUpBoardRequest>({
    mutationKey: ['signUpBoard'],
    mutationFn: signUpBoard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'list'] });
    },
  });
};

// comment
export const useGetComment = (diaryId: number, lastViewId: number) => {
  return useQuery({
    queryKey: ['getComment', diaryId],
    queryFn: () => getComment({ diaryId, pageSize: 10, lastViewId }),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: createComment,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getComment'] });
      queryClient.invalidateQueries({ queryKey: ['getReply'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'diaryDetail'] });
    },
  });
};

export const useGetReply = (commentId: number, lastViewId: number) => {
  return useQuery({
    queryKey: ['getReply', commentId],
    queryFn: () => getReply({ commentId, lastViewId }),
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createReply'],
    mutationFn: createReply,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getReply'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'diaryDetail'] });
    },
  });
};

// diary
export const useGetLike = (diaryId: number) => {
  return useQuery({
    queryKey: ['getLike'],
    queryFn: () => getLikes({ diaryId }),
  });
};

export const useUpdateLike = (diaryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLike'],
    mutationFn: () => updateLikes({ diaryId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getLike'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'diaryDetail'] });
    },
  });
};

export const useDeleteDiary = () => {
  return useMutation({
    mutationKey: ['deleteDiary'],
    mutationFn: deleteDiary,
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

export const useCreateShareLink = () => {
  return useMutation({
    mutationKey: ['createShareLink'],
    mutationFn: createShareLink,
  });
};

export const useGetShareLinkMetadata = ({ hashKey }: { hashKey: string }) => {
  return useSuspenseQuery({
    queryKey: ['shareLinkMetadata'],
    queryFn: () => getShareLinkMetadata({ hashKey }),
  });
};

export const useGetNotifications = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['infiniteNotifications'],
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

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['readAllNotification'],
    mutationFn: readAllNotifications,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['infiniteNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'hero'] });
    },
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
    queryKey: ['myboard', 'diaryDetail', memberId],
    enabled: memberId !== undefined,
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

// setting
export const useGetUser = () => {
  return useQuery({
    queryKey: ['myboard', 'member'],
    queryFn: getUser,
  });
};

export const useUpdateUser = (profileUrl: File | string, nickname: string) => {
  return useMutation({
    mutationKey: ['myboard', 'updateUser'],
    mutationFn: () => updateUser({ profileUrl, nickname }),
  });
};

export const useUpdateFont = (font: number, memberId: number) => {
  return useMutation({
    mutationKey: ['myboard', 'updateFont'],
    mutationFn: () => updateFont({ font, memberId }),
  });
};

export const useCreateQnA = () => {
  return useMutation({
    mutationKey: ['myboard', 'createQnA'],
    mutationFn: createQnA,
  });
};

export const useGetEmotionQuestion = () => {
  return useQuery({
    queryKey: ['prediction', 'emotion'],
    queryFn: getEmotionQuestion,
  });
};
