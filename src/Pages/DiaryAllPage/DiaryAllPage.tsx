import { useGetAllDiary } from '@Hooks/NetworkHooks';
import styles from './DiaryAllPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DiaryItem } from '@Components/DiaryItem';
import { todayDiaryData } from '@Type/Response';
import { IsNotDiary } from '@Pages/DiaryCalendarPage/DiaryCalendarPage';

type IsNewDateDiaryProps = {
  diary: todayDiaryData;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

const IsNewDateDiary = ({ diary, selectedDate, setSelectedDate }: IsNewDateDiaryProps) => {
  if (selectedDate !== diary.selectedDate) {
    return (
      <h3 style={{ marginTop: '10px' }}>
        {diary.selectedDate.split('-')[1]}월 {diary.selectedDate.split('-')[2].split('T')[0]}일 일기
      </h3>
    );
  } else {
    setSelectedDate(diary.selectedDate);

    return <></>;
  }
};

// TODO: [fix] 큰 날짜 수정
export const DiaryAllPage = () => {
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];
  // TODO: [feat] 무한 스크롤 구현하기
  const [lastViewId] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { data: AllDiaryData, isError, isSuccess } = useGetAllDiary(Number(boardId), 10, lastViewId);

  return (
    <div className={styles.container}>
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
              {AllDiaryData?.map((diary) => (
                <div key={`diaryAll-${diary.id}`}>
                  <IsNewDateDiary diary={diary} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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
