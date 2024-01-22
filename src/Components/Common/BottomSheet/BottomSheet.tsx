import React from 'react';
import styles from './BottomSheet.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';

type BottonSheetProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title: string;
};

export const BottomSheet = ({ setClose, content, title }: BottonSheetProps) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={() => setClose(false)}>
          <SVGIcon name="close" />
        </button>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
