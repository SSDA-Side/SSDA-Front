import { EmotionImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';
import { todayDiaryData } from '@Type/Response';
import styles from './DiaryCard.module.scss';

type DiaryCardProp = {
  onClick: () => void;
} & todayDiaryData;

export const DiaryCard = ({
  thumbnailUrl,
  nickname,
  emotionId,
  title,
  likeCount,
  commentCount,
  timeStamp,
  onClick,
}: DiaryCardProp) => {
  const hasThumbnailUrl = !!thumbnailUrl;

  return (
    <li className={styles.diaryItem} onClick={() => onClick()}>
      <div className={styles.diaryImageWrapper}>
        {!hasThumbnailUrl && <EmotionImage index={emotionId} />}
        {hasThumbnailUrl && <img src={thumbnailUrl} />}
      </div>

      <div className={styles.colGroup} style={{ padding: '1rem' }}>
        <h4>{title}</h4>
        <div className={styles.rowGroup} style={{ justifyContent: 'space-between' }}>
          <div className={styles.rowGroup} style={{ alignItems: 'center' }}>
            <span>{nickname}</span>
            <span className={styles.relativeLabel}>{timeStamp}</span>
          </div>

          <div className={styles.rowGroup}>
            <span className={styles.withIcon}>
              <SVGIcon name="empty-heart" className={styles.size18} /> {likeCount}
            </span>

            <span className={styles.withIcon}>
              <SVGIcon name="comment" className={styles.size18} /> {commentCount}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
