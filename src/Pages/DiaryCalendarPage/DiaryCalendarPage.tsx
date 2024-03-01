import sleepImage from '@Assets/EmotionImages/sleepEmotion.png';
import { Calendar } from '@Components/Calendar';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { DiaryCard } from '@Components/DiaryCard';
import { useGetMonth, useGetTodayDiary } from '@Hooks/NetworkHooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DiaryCalendarPage.module.scss';

export const DiaryCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(currentDate);

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectViewDate = (date: Date) => {
    setViewDate(date);
  };

  return (
    <>
      <AwaitedCalendar
        viewDate={viewDate}
        selectDate={currentDate}
        onSelectViewDate={handleSelectViewDate}
        onSelectDate={handleSelectDate}
      />
      <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
        {/* <Calendar selectDate={currentDate} onSelectDate={handleSelectDate} /> */}
        <DiaryList selectedDate={currentDate} />
      </AsyncBoundary>
    </>
  );
};

const AwaitedCalendar = ({
  viewDate,
  selectDate,
  onSelectViewDate,
  onSelectDate,
}: {
  viewDate: Date;
  selectDate: Date;
  onSelectViewDate: (date: Date) => void;
  onSelectDate: (date: Date) => void;
}) => {
  const params = useParams();
  const { boardId } = params;

  const { data } = useGetMonth(Number(boardId), viewDate);
  const { dateList: writtenDates } = data || { dateList: [] };

  return (
    <Calendar
      viewDate={viewDate}
      selectDate={selectDate}
      writtenDates={writtenDates}
      onSelectViewDate={onSelectViewDate}
      onSelectDate={onSelectDate}
    />
  );
};

const NoDiarysView = () => {
  return (
    <div className={styles.noDiaryView}>
      <img src={sleepImage} className={styles.size120} />
      <h3>아직 작성된 일기가 없어요</h3>
      <p>가장 먼저 일기를 작성해보세요!</p>
    </div>
  );
};

const DiaryList = ({ selectedDate }: { selectedDate: Date }) => {
  const params = useParams();
  const { boardId } = params;

  return (
    <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<LoadingUI selectedDate={selectedDate} />}>
      <AwaitedDiaryList selectedDate={selectedDate} boardId={Number(Number(boardId!))} />
    </AsyncBoundary>
  );
};

const LoadingUI = ({ selectedDate }: { selectedDate: Date }) => {
  const dateLabel = `${new Intl.DateTimeFormat('ko-KR', { month: '2-digit' }).format(
    selectedDate,
  )} ${new Intl.DateTimeFormat('ko-KR', { day: '2-digit' }).format(selectedDate)}`;

  return (
    <div className={styles.diaryListSection}>
      <div className={styles.colGroup}>
        <h2>{dateLabel} 일기</h2>
        <p>일기를 불러오는 중입니다...</p>
      </div>
    </div>
  );
};

const AwaitedDiaryList = ({ selectedDate, boardId }: { selectedDate: Date; boardId: number }) => {
  const mutatedDate = selectedDate.toISOString().split('T')[0];
  // console.log(new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(selectedDate));
  console.log(selectedDate.toLocaleString());
  const { data: dirays } = useGetTodayDiary(boardId, mutatedDate);

  const dateLabel = `${new Intl.DateTimeFormat('ko-KR', { month: '2-digit' }).format(
    selectedDate,
  )} ${new Intl.DateTimeFormat('ko-KR', { day: '2-digit' }).format(selectedDate)}`;

  const hasNoDiary = dirays.length === 0;

  if (hasNoDiary) {
    return (
      <div className={styles.diaryListSection}>
        <div className={styles.colGroup}>
          <h2>{dateLabel} 일기</h2>
          <NoDiarysView />
        </div>
      </div>
    );
  }

  const diaryCount = dirays.length;

  return (
    <div className={styles.diaryListSection}>
      <div className={styles.colGroup}>
        <h2>{dateLabel} 일기</h2>
        <p className={styles.gray700}>총 {diaryCount}개의 일기가 있습니다.</p>
      </div>

      <ul id="diaryList" className={styles.diaryList}>
        {dirays.map((diary) => (
          <DiaryCard key={diary.id} {...diary} onClick={() => {}} />
        ))}
      </ul>

      <p className={styles.gray700}>모든 일기를 불러왔습니다.</p>
    </div>
  );
};
