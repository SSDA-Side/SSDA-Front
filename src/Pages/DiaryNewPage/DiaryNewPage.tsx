import { useGetNewDiary, useUpdateRead } from '@Hooks/NetworkHooks';
import { useLocation } from 'react-router-dom';
import styles from './DiaryNewPage.module.scss';
import { DiaryItem } from '@Components/DiaryItem';
import { IsNotDiary } from '@Pages/DiaryCalendarPage/DiaryCalendarPage';

export const DiaryNewPage = () => {
  const location = useLocation();
  const boardId = location.pathname.split('/')[3];

  const { data: NewDiaryData, isError, isSuccess } = useGetNewDiary(Number(boardId));
  const { mutate: isUpdateReadMutation } = useUpdateRead(Number(boardId));

  const handleUpdateRead = () => {
    isUpdateReadMutation();
  };

  return (
    <div className={styles.container}>
      {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
      {isSuccess ? (
        NewDiaryData?.length === 0 ? (
          <div className={styles.notDiaryContainer}>
            <IsNotDiary />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1>새로운 일기가 {NewDiaryData?.length}개 있어요</h1>
            </div>
            <div className={styles.readContainer}>
              <button onClick={handleUpdateRead}>전체 읽음처리</button>
            </div>
            <div className={styles.content}>
              {NewDiaryData?.map((diary) => <DiaryItem key={diary.id} diary={diary} />)}
            </div>
          </>
        )
      ) : null}
    </div>
  );
};
