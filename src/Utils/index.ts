import type { Board } from '@Type/Model';
import type { HeroData } from '@Type/Response';

type GetDescriptionProp = Pick<HeroData, 'hasSharedBoard'> & Pick<Board, 'memberCount' | 'diaryCount'>;
export const getDescription = ({ hasSharedBoard, memberCount, diaryCount }: GetDescriptionProp) => {
  const hasWrittenDiary = diaryCount > 0;

  const NO_SHARED_TEXT = `아직 일상을 공유하고 있는 사람이 없네요.\n공유 일기장을 만들어보세요!`;
  const HAS_WRITTEN_TEXT = `지금까지 ${memberCount}명과 ${diaryCount}개의 일기를 공유했어요👍`;
  const HAS_NO_WRITTEN_TEXT = `내 소중한 일상을 공유할 순간이에요.\n첫 일기를 작성해보세요!`;

  return !hasSharedBoard ? NO_SHARED_TEXT : hasWrittenDiary ? HAS_WRITTEN_TEXT : HAS_NO_WRITTEN_TEXT;
};
