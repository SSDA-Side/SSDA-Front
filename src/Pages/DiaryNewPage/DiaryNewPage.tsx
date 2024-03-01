import sleepImage from '@Assets/EmotionImages/sleepEmotion.png';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { DiaryCard } from '@Components/DiaryCard';
import { useGetNewDiary } from '@Hooks/NetworkHooks';
import { useParams } from 'react-router-dom';
import styles from './DiaryNewPage.module.scss';

export const DiaryNewPage = () => {
  return (
    <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
      <AwaitedDiaryNewPage />
    </AsyncBoundary>
  );
};

const AwaitedDiaryNewPage = () => {
  const params = useParams();
  const { boardId } = params;

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
                <h3>02월 03일의 일기</h3>
                <DiaryCard key={diary.id} {...diary} onClick={() => {}} />
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
