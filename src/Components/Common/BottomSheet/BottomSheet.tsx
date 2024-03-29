import React from 'react';
import styles from './BottomSheet.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import { Typography } from '../Typography';

type BottomSheetProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title: string;
};

// TODO: [refactor] 코드 참고하여 리팩토링, recoil로 상태관리
export const BottomSheet = ({ setClose, content, title }: BottomSheetProps) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
        <Typography as="h2">{title}</Typography>
        <button onClick={() => setClose(false)}>
          <SVGIcon name="close" />
        </button>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
