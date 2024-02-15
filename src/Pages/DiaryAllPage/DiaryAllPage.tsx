import { useGetAllDiary } from '@Hooks/NetworkHooks';
import styles from './DiaryAllPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DiaryItem } from '@Components/DiaryItem';

export const DiaryAllPage = () => {
  const location = useLocation();
  const boardId = location.pathname.split('/')[3];
  const [lastViewId, setLastViewId] = useState<number>(0);

  const { data: AllDiaryData, isError, isSuccess } = useGetAllDiary(Number(boardId), 10, lastViewId);

  isSuccess && console.log(AllDiaryData);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>일기 모아보기</h1>
        <p>다른 멤버들이 올린 일기를 확인해보세요!</p>
      </div>
      <div className={styles.content}>
        {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
        {AllDiaryData?.length === 0 ? (
          <div>일기를 작성해주세요.</div>
        ) : (
          AllDiaryData?.map((diary) => <DiaryItem key={diary.id} diary={diary} />)
        )}
      </div>
    </div>
  );
};
