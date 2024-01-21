import { getBoardList, getBoardMemberList, getHeroData } from '@APIs/index';
import { useQuery } from '@tanstack/react-query';

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
