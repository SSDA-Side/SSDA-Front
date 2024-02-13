import React, { useMemo } from 'react';

import styles from './EmotionSelect.module.scss';

import { EmotionImage } from '@Assets/EmotionImages';
import { emotionTypes } from '@Assets/EmotionImages/EmotionImage';

type EmotionSelectProp = { onSelect: (emotionId: string) => void };
export const EmotionSelect = ({ onSelect }: EmotionSelectProp) => {
  const emotionElements = useMemo(
    () =>
      emotionTypes.map((emotion, index) => (
        <button key={emotion} type="button" onClick={() => onSelect(index.toString())}>
          <EmotionImage key={emotion} type={emotion} />
        </button>
      )),
    [onSelect],
  );

  return <div className={styles.emotionList}>{emotionElements}</div>;
};
