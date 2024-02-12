import { useGetNewDiary } from '@Hooks/NetworkHooks';
import { useLocation } from 'react-router-dom';
import styles from './DiaryNewPage.module.scss';

export const DiaryNewPage = () => {
  const location = useLocation();
  const boardId = location.pathname.split('/')[3];

  const { data: NewDiaryData, isError, isSuccess } = useGetNewDiary(Number(boardId));

  isSuccess && console.log(NewDiaryData);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>새로운 일기가 {NewDiaryData?.length}개 있어요</h1>
      </div>
      <div className={styles.content}>
        {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
        {/* TODO: API 정상적으로 연결되면 주석 해제 */}
        {/* {NewDiaryData?.length === 0 ? (
          <div>작성한 일기가 없습니다.</div>
        ) : (
          AllDiaryData.map((diary) => <DiaryItem key={diary.id} diary={diary} />)
        )} */}
      </div>
    </div>
  );
};
