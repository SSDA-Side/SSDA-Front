import React from 'react';
import styles from './styles.module.scss';

type BottonSheetProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  header: React.ReactNode;
};

export const BottomSheet = ({ setClose, content, header }: BottonSheetProps) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <button onClick={() => setClose(false)}>닫기</button>
      </div>
    </div>
  );
};
