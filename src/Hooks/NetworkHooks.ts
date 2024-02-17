import { useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  createBoard,
  createDiary,
  createShareLink,
  deleteBoard,
  getBoardList,
  getHeroMetadata,
  getMemberList,
  getNotifications,
  getShareLinkMetadata,
  updateBoard,
} from '@APIs/index';

import type { GetMemberListRequest } from '@Type/Request';

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
      const isLastPage = lastPage.length < 10;
      return isLastPage ? undefined : lastPage[lastPage.length - 1].id;
    },
    initialPageParam: 0,
  });
};
