import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { DiaryCard } from '@Components/DiaryCard';
import { useGetAllDiary } from '@Hooks/NetworkHooks';
import { useInfiniteObserver } from '@Hooks/useInfiniteObserver';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DiaryAllPage.module.scss';

export const DiaryAllPage = () => {
  return (
    <>
      <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
        <AwaitedDiayAll />
      </AsyncBoundary>
    </>
  );
};

const AwaitedDiayAll = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { boardId } = params;

  const { data, hasNextPage, fetchNextPage } = useGetAllDiary(Number(boardId!), 10, 0);
  const { disconnect } = useInfiniteObserver({
    parentNodeId: 'diaryList',
    onIntersection: fetchNextPage,
  });

  useEffect(() => {
    !hasNextPage && disconnect();
  }, [hasNextPage]);

  return (
    <>
      <div>
        <h2>일기 모아보기</h2>
        <p>다른 멤버들이 올린 일기를 확인해보세요!</p>
      </div>

      <div className={styles.allList}>
        <div className={styles.dayListSection}>
          <ul id="diaryList" className={styles.diaryList}>
            {data.pages.map((page) =>
              page.map((diary) => (
                <>
                  <h3>
                    {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(diary.selectedDate))}
                  </h3>
                  <DiaryCard
                    key={diary.id}
                    {...diary}
                    onClick={() => {
                      navigate(`/myboard/${boardId}/diary/${diary.id}`, { state: JSON.stringify(page) });
                    }}
                  />
                </>
              )),
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
