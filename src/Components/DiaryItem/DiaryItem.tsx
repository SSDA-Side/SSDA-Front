import React from 'react';
import styles from './DiaryItem.module.scss';
import { EmotionImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';
import { todayDiaryData } from '@Type/Response';
import { useNavigate } from 'react-router-dom';

export const DiaryItem = ({ diary }: { diary: todayDiaryData }) => {
  const navigate = useNavigate();
  const selectDay =
    diary.selectDate !== undefined
      ? diary.selectDate.split('T')[0]
      : diary.selectedDate !== undefined
        ? diary.selectedDate.split('T')[0]
        : '';

  return (
    <button
      className={styles.container}
      onClick={() => {
        navigate(`/myboard/${diary.id}/${selectDay}`);
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
            {diary.nickname}
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
