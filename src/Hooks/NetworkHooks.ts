import { createDiary, getBoardList, getBoardMemberList, getHeroData, getMonth } from '@APIs/index';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useGetMonth = (boardId: number, date: string) => {
  return useMutation({
    mutationKey: ['myboard', 'month'],
    mutationFn: () => getMonth(boardId, date),
    onSuccess: (data) => {
      return data.dataList;
    },
  });
};
