import styles from './DiaryItem.module.scss';
import { EmotionImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';
import { todayDiaryData } from '@Type/Response';
import { useNavigate } from 'react-router-dom';

export const DiaryItem = ({ diary }: { diary: todayDiaryData }) => {
  const navigate = useNavigate();
  const selectDay = diary.selectedDate !== undefined ? diary.selectedDate.split('T')[0] : '';
  return (
    <button
      className={styles.container}
      onClick={() => {
        navigate(`/myboard/${diary.boardId}/${selectDay}`);
      }}
    >
      <div className={styles.header}>
        {/* TODO: [fix] 이미지 정상적으로 처리될 때까지 이모지로 대체 */}
        {true ? <EmotionImage index={Number(diary.emotionId)} /> : <img src={diary.thumbnailUrl} alt="thumbnail" />}
      </div>
      <div className={styles.content}>
        <h2>{diary.title}</h2>
        <div className={styles.info}>
          <div className={styles.name}>
            <h3>{diary.nickname}</h3>
            <p>{diary.timeStamp}</p>
          </div>
          <div className={styles.count}>
            <SVGIcon name="empty-heart" size={16} />
            {diary.likeCount}
            <SVGIcon name="comment" size={16} />
            {diary.commentCount}
          </div>
        </div>
      </div>
    </button>
  );
};
