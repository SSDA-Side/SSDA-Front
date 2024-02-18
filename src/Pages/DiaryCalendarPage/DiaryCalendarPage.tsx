import { Calendar } from '@Components/Calendar';
import styles from './DiaryCalendarPage.module.scss';
import { useRecoilState } from 'recoil';
import { selectedDateStore } from '@Store/index';
import { useGetTodayDiary } from '@Hooks/NetworkHooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DiaryItem } from '@Components/DiaryItem';
import { formatDate } from '@Utils/FormatDate';

export const DiaryCalendarPage = () => {
  const selectedDate = useRecoilState(selectedDateStore);
  const { date } = selectedDate[0];

  const location = useLocation();
  const boardId = location.pathname.split('/')[3];
  const dateStr = `${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())}`;

  const {
    mutate: getTodayDiaryMutation,
    isSuccess,
    isError,
    data: todayData,
  } = useGetTodayDiary(Number(boardId), dateStr);

  useEffect(() => {
    getTodayDiaryMutation();
  }, [dateStr]);

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <Calendar />
        <div className={styles.content}>
          <h1>
            {formatDate(date.getMonth() + 1)}월 {formatDate(date.getDate())}일 일기
          </h1>

          {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
          {isSuccess && <p>총 {todayData?.length}개의 일기가 있습니다.</p>}
          {todayData?.length === 0 ? (
            <div>일기를 작성해주세요.</div>
          ) : (
            todayData?.map((diary) => <DiaryItem key={`diary-${diary.id}`} diary={diary} />)
          )}
        </div>
      </div>
    </div>
  );
};
