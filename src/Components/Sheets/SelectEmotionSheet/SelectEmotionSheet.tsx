import { Typography } from '@Components/Common/Typography';
import { EmotionSelect } from '@Components/EmotionSelect';
import { useSheet } from '@Hooks/useSheet';
import styles from './SelectEmotionSheet.module.scss';
import { useGetEmotionQuestion } from '@Hooks/NetworkHooks';

// export const SelectEmotionSheet = ({ sheetId }: { sheetId: string }) => {
export const SelectEmotionSheet = () => {
  // const { openAlert } = useModal();
  const { data } = useGetEmotionQuestion();
  const { bottomSheet, closeBottomSheet } = useSheet();
  const { onSelect } = bottomSheet;

  const handleSelect = (emotionId: number) => {
    closeBottomSheet();
    onSelect && onSelect(emotionId);
  };

  return (
    <div className={styles.container}>
      <Typography as="body2">{data?.emotionContent || '질문 불러오는 중...'}</Typography>
      <EmotionSelect onSelect={handleSelect} />
    </div>
  );
};
