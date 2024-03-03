import sleepImage from '@Assets/EmotionImages/sleepEmotion.png';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { DiaryCard } from '@Components/DiaryCard';
import { useGetNewDiary } from '@Hooks/NetworkHooks';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DiaryNewPage.module.scss';
import { ErrorUI } from '@Components/ErrorUI';

export const DiaryNewPage = () => {
  return (
    <AsyncBoundary ErrorFallback={ErrorUI} SuspenseFallback={<LoadingUI />}>
      <AwaitedDiaryNewPage />
    </AsyncBoundary>
  );
};

const AwaitedDiaryNewPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { data: diarys } = useGetNewDiary(Number(boardId!));

  const hasNoDiary = diarys.length === 0;

  if (hasNoDiary) {
    return (
      <>
        <div>
          <h2>새로운 일기 보기</h2>
          <p>새로운 일기를 놓치지 말고 확인해보세요!</p>
        </div>

        <div className={styles.noDiaryView}>
          <img src={sleepImage} className={styles.size120} />
          <h3>모든 일기를 확인했어요</h3>
          <p>새로운 일기를 작성해보세요!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>새로운 일기 보기</h2>
        <p>새로운 일기를 놓치지 말고 확인해보세요!</p>
      </div>

      <div className={styles.allList}>
        <div className={styles.dayListSection}>
          <ul id="diaryList" className={styles.diaryList}>
            {diarys.map((diary) => (
              <>
                <h3>{new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(diary.selectedDate))}</h3>
                <DiaryCard
                  key={diary.id}
                  {...diary}
                  onClick={() => {
                    navigate(`/myboard/${boardId}/diary/${diary.id}`);
                  }}
                />
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const LoadingUI = () => {
  return (
    <>
      <div>
        <div className={styles.skeletonItem} style={{ width: '30%', height: '1.5rem', marginBottom: '1rem' }} />
        <div className={styles.skeletonItem} style={{ width: '100%' }} />
      </div>

      <div>
        <div className={styles.skeletonItem} style={{ width: '50%', height: '1.5rem', marginBottom: '1rem' }} />
        <div className={styles.skeletonItem} style={{ width: '100%', aspectRatio: '1 / 1', height: 'auto' }} />
      </div>

      <div>
        <div className={styles.skeletonItem} style={{ width: '50%', height: '1.5rem', marginBottom: '1rem' }} />
        <div className={styles.skeletonItem} style={{ width: '100%', aspectRatio: '1 / 1', height: 'auto' }} />
      </div>
    </>
  );
};
