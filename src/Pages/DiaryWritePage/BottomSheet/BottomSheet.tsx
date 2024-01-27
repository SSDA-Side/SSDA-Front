import { useMemo } from 'react';

import styles from './BottomSheet.module.scss';

import { EmotionImage } from '@Assets/EmotionImages';
import { emotionTypes } from '@Assets/EmotionImages/EmotionImage';

import { Typography } from '@Components/Common/Typography';

import { useBottomSheet } from './useBottomSheet';

export const BottomSheet = () => {
  const { isOpened, selectEmotion } = useBottomSheet();

  const emotionElements = useMemo(
    () =>
      emotionTypes.map((emotion, index) => (
        <button key={emotion} onClick={() => selectEmotion(index.toString())}>
          <EmotionImage key={emotion} type={emotion} />
        </button>
      )),
    [],
  );

  return (
    isOpened && (
      <div className={styles.container}>
        <div className={styles.sheet}>
          <div className={styles.heading}>
            <Typography as="body3">2024.01.27</Typography>
            <Typography as="body1">오늘 하루는 어땠나요?</Typography>
          </div>

          <div className={styles.emotionList}>{emotionElements}</div>
        </div>
      </div>
    )
  );
};
