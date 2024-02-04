import React from 'react';
import styles from './DiaryItem.module.scss';
import { EmotionImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';

type DiaryItemProps = {
  diary: {
    id: string;
    member: {
      id: string;
      nickname: string;
    };
    boardId: string;
    emotionId: string;
    thumbnailUrl: string;
    likeCount: string;
    commentCount: string;
    selectedDate: string;
    timeStamp: string;
    title: string;
  };
};

export const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <button
      className={styles.container}
      onClick={() => {
        console.log(diary.id, diary.member.id);
      }}
    >
      <div className={styles.header}>
        {diary.thumbnailUrl === '' ? (
          <EmotionImage index={Number(diary.emotionId)} />
        ) : (
          <img src={diary.thumbnailUrl} alt="thumbnail" />
        )}
      </div>
      <div className={styles.content}>
        <h2>{diary.title}</h2>
        <div className={styles.info}>
          <h3>
            {diary.member.nickname}
            <span>{diary.timeStamp}</span>
          </h3>
          <div className={styles.count}>
            <SVGIcon name="love" size={20} />
            {diary.likeCount}
            <SVGIcon name="comment" size={20} />
            {diary.commentCount}
          </div>
        </div>
      </div>
    </button>
  );
};
