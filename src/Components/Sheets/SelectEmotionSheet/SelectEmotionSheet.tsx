import { Typography } from '@Components/Common/Typography';
import { EmotionSelect } from '@Components/EmotionSelect';
import { useModal } from '@Hooks/useModal';

import styles from './SelectEmotionSheet.module.scss';
import { useSheet } from '@Hooks/useSheet';

export const SelectEmotionSheet = ({ sheetId }: { sheetId: string }) => {
  const { openAlert } = useModal();
  const { bottomSheet, closeBottomSheet } = useSheet();
  const { onSelect } = bottomSheet;

  const handleSelect = (emotionId: string) => {
    closeBottomSheet();
    onSelect && onSelect(emotionId);
  };

  return (
    <div className={styles.container}>
      <Typography as="body2">오늘 하루는 어떠셨나요?</Typography>
      <EmotionSelect onSelect={handleSelect} />
    </div>
  );
};
