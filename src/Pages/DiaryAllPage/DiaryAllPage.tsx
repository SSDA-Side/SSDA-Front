import { useGetAllDiary } from '@Hooks/NetworkHooks';
import styles from './DiaryAllPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DiaryItem } from '@Components/DiaryItem';
import { todayDiaryData } from '@Type/Response';
import cn from 'classnames';
import { IsNotDiary } from '@Pages/DiaryCalendarPage/DiaryCalendarPage';

type IsNewDateDiaryProps = {
  diary: todayDiaryData;
  beforeDiary: todayDiaryData;
};

const IsNewDateDiary = ({ diary, beforeDiary }: IsNewDateDiaryProps) => {
  const beforeDate = beforeDiary?.selectedDate?.split('T')[0];
  const currentDate = diary.selectedDate.split('T')[0];

  return (
    <>
      {beforeDate !== currentDate && (
        <h3 style={{ marginTop: '10px' }}>
          {diary.selectedDate.split('-')[1]}월 {diary.selectedDate.split('-')[2].split('T')[0]}일 일기
        </h3>
      )}
    </>
  );
};

export const DiaryAllPage = () => {
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];
  // TODO: [feat] 무한 스크롤 구현하기
  const [lastViewId, setLastViewId] = useState<number>(0);

  const {
    data: AllDiaryData,
    isError,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllDiary(Number(boardId), 10, lastViewId);

  useEffect(() => {
    const container = document.querySelector('.diary-container');

    function handleScroll() {
      if (
        container?.scrollTop &&
        container?.scrollHeight &&
        container?.clientHeight &&
        container.scrollTop + container.clientHeight >= container.scrollHeight
      ) {
        !isLoading && AllDiaryData && setLastViewId((lastViewId) => lastViewId + 10);
        return;
      }
    }
    container?.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (lastViewId > 0 && AllDiaryData && AllDiaryData?.length % 10 === 0) {
      refetch();
    }
  }, [lastViewId]);

  return (
    <div className={cn(styles.container, 'diary-container')}>
      {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
      {isSuccess ? (
        AllDiaryData?.length === 0 ? (
          <div className={styles.notDiaryContainer}>
            <IsNotDiary />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1>일기 모아보기</h1>
              <p>다른 멤버들이 올린 일기를 확인해보세요!</p>
            </div>
            <div className={styles.content}>
              {AllDiaryData?.map((diary, i, arr) => (
                <div key={`diaryAll-${diary.id}`}>
                  <IsNewDateDiary diary={diary} beforeDiary={arr[i - 1]} />

                  <DiaryItem diary={diary} />
                </div>
              ))}
            </div>
          </>
        )
      ) : null}
    </div>
  );
};
