import {
  createBoard,
  createComment,
  createDiary,
  createQnA,
  createReply,
  createShareLink,
  deleteBoard,
  deleteComment,
  deleteDiary,
  deleteReply,
  getAllDiary,
  getBoardList,
  getBoardTitle,
  getComment,
  getDiaryDetail,
  getEmotionQuestion,
  getHeroMetadata,
  getLikes,
  getMemberList,
  getMonth,
  getNewDiary,
  getNotifications,
  getReply,
  getShareLinkMetadata,
  getTodayDiary,
  getUser,
  isNewDiary,
  kakaoLogin,
  readAllNotifications,
  readNotification,
  resignBoard,
  signUpBoard,
  updateBoard,
  updateDiary,
  updateFont,
  updateLikes,
  updateRead,
  updateUser,
} from '@APIs/index';
import { GetMemberListRequest, SignUpBoardRequest } from '@Type/Request';
import { setCookie } from '@Utils/Cookies';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
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

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: deleteComment,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getComment'] });
      queryClient.invalidateQueries({ queryKey: ['getReply'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'diaryDetail'] });
    },
  });
};

export const useDeleteReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteReply'],
    mutationFn: deleteReply,
    onSuccess() {
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
export const useGetBoardTitle = (boardId: number) => {
  return useQuery({
    queryKey: ['getBoardTitle'],
    queryFn: () => getBoardTitle({ boardId }),
  });
};

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

export const useUpdateDiary = () => {
  return useMutation({
    mutationKey: ['updateDiary'],
    mutationFn: updateDiary,
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
      if (lastPage === undefined) return undefined;
      const isLastPage = lastPage.length < 10;
      return isLastPage ? undefined : lastPage[lastPage.length - 1].id;
    },
    initialPageParam: 0,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['readNotification'],
    mutationFn: readNotification,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['infiniteNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['myboard', 'hero'] });
    },
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
    queryKey: ['myboard', 'diaryDetail', memberId, boardId, date],
    enabled: memberId !== undefined && !isNaN(memberId),
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
export const useKaKaoLogin = () => {
  return useMutation({
    mutationKey: ['kakao', 'login'],
    mutationFn: kakaoLogin,
    onSuccess: (data) => {
      // const expirationTime = new Date();
      // expirationTime.setSeconds(expirationTime.getSeconds() + 1800);
      setCookie('accessToken', data['accessToken'], { path: '/' });
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['myboard', 'updateUser'],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'member'] });
    },
  });
};

export const useUpdateFont = (font: number, memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['myboard', 'updateFont'],
    mutationFn: () => updateFont({ font, memberId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myboard', 'member'] });
    },
  });
};

export const useCreateQnA = () => {
  return useMutation({
    mutationKey: ['createQnA'],
    mutationFn: createQnA,
  });
};

export const useGetEmotionQuestion = () => {
  return useQuery({
    queryKey: ['prediction', 'emotion'],
    queryFn: getEmotionQuestion,
  });
};
