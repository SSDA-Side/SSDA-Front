import { IconButton } from '@Components/Common/Button';
import cn from 'classnames';
import { useMemo, useState } from 'react';
import styles from './DiaryCalendarPage.module.scss';
import { EmotionImage } from '@Assets/EmotionImages';
import sleepImage from '@Assets/EmotionImages/sleepEmotion.png';
import { SVGIcon } from '@Icons/SVGIcon';

export const DiaryCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashedContainer}>
        <Calendar selectDate={currentDate} onSelectDate={handleSelectDate} />
        {/* <NoDiarysView /> */}
        <DiaryList />
      </div>
    </div>
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

const DiaryList = () => {
  return (
    <div className={styles.diaryListSection}>
      <div className={styles.colGroup}>
        <h2>03월 13일 일기</h2>
        <p className={styles.gray700}>총 12개의 일기가 있습니다.</p>
      </div>

      <ul id="diaryList" className={styles.diaryList}>
        <li className={styles.diaryItem}>
          <div className={styles.diaryImageWrapper}>
            {/* <EmotionImage type="sad" /> */}
            <img src="/profile/1.jpg" />
          </div>

          <div className={styles.colGroup} style={{ padding: '1rem' }}>
            <h4>일기 제목입니다</h4>
            <div className={styles.rowGroup} style={{ justifyContent: 'space-between' }}>
              <div className={styles.rowGroup} style={{ alignItems: 'center' }}>
                <span>김주현</span>
                <span className={styles.relativeLabel}>5일 전</span>
              </div>

              <div className={styles.rowGroup}>
                <span className={styles.withIcon}>
                  <SVGIcon name="empty-heart" className={styles.size18} /> 10
                </span>

                <span className={styles.withIcon}>
                  <SVGIcon name="comment" className={styles.size18} /> 7
                </span>
              </div>
            </div>
          </div>
        </li>

        <li className={styles.diaryItem}>
          <div className={styles.diaryImageWrapper}>
            <EmotionImage type="sad" />
            {/* <img src="/profile/1.jpg" /> */}
          </div>

          <div className={styles.colGroup} style={{ padding: '1rem' }}>
            <h4>일기 제목입니다</h4>
            <div className={styles.rowGroup} style={{ justifyContent: 'space-between' }}>
              <div className={styles.rowGroup} style={{ alignItems: 'center' }}>
                <span>김주현</span>
                <span className={styles.relativeLabel}>5일 전</span>
              </div>

              <div className={styles.rowGroup}>
                <span className={styles.withIcon}>
                  <SVGIcon name="empty-heart" className={styles.size18} /> 10
                </span>

                <span className={styles.withIcon}>
                  <SVGIcon name="comment" className={styles.size18} /> 7
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <p className={styles.gray700}>모든 일기를 불러왔습니다.</p>
    </div>
  );
};

const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({ selectDate, onSelectDate }: { selectDate: Date; onSelectDate: (date: Date) => void }) => {
  // month는 0부터, day는 1부터
  const [viewDate, setViewDate] = useState(selectDate);
  const [currentYear, currentMonth] = [viewDate.getFullYear(), viewDate.getMonth()];

  const dateLabel = `${currentYear}년 ${(currentMonth + 1).toString().padStart(2, '0')}월`;
  const startIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastMonth = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfWeek = new Date(currentYear, currentMonth + 1, 0).getDay();

  const lastMonthDays = useMemo(
    () =>
      Array(startIndex)
        .fill(0)
        .map((_, index) => lastMonth.getDate() - startIndex + index + 1),
    [currentMonth],
  );

  const currentMonthDays = useMemo(
    () =>
      Array(lastDay)
        .fill(0)
        .map((_, index) => index + 1),
    [currentMonth],
  );

  const visibleDayCount = lastMonthDays.length + currentMonthDays.length;
  const shouldRenderMoreWeek = visibleDayCount <= 35;

  const nextMonthDays = useMemo(
    () =>
      Array(6 - lastDayOfWeek + (shouldRenderMoreWeek ? 7 : 0))
        .fill(0)
        .map((_, index) => index + 1),
    [currentMonth],
  );

  return (
    <div className={styles.calendarSection}>
      <div className={styles.dateContainer}>
        <IconButton icon="left" onClick={() => setViewDate(new Date(currentYear, currentMonth, 0))} />
        <p>{dateLabel}</p>
        <IconButton icon="right" onClick={() => setViewDate(new Date(currentYear, currentMonth + 1, 1))} />
      </div>

      <ul className={styles.calendarContainer}>
        {dayOfWeekNames.map((name) => (
          <li key={name} className={cn(styles.dayItem, styles.headerItem)}>
            {name}
          </li>
        ))}

        {lastMonthDays.map((day) => (
          <li
            key={`last-${day}`}
            className={cn(styles.dayItem, styles.grayed)}
            onClick={() => {
              setViewDate(new Date(currentYear, currentMonth - 1, day));
              onSelectDate(new Date(currentYear, currentMonth - 1, day));
            }}
          >
            {day}
          </li>
        ))}

        {currentMonthDays.map((day) => (
          <li
            key={`current-${day}`}
            className={cn(styles.dayItem, {
              [styles.grayed]:
                viewDate.getFullYear() !== selectDate.getFullYear() || viewDate.getMonth() !== selectDate.getMonth(),
              [styles.activeItem]:
                viewDate.getFullYear() === selectDate.getFullYear() &&
                viewDate.getMonth() === selectDate.getMonth() &&
                day === selectDate.getDate(),
              // [styles.hasItem]: day === 30,
            })}
            onClick={() => {
              setViewDate(new Date(currentYear, currentMonth, day));
              onSelectDate(new Date(currentYear, currentMonth, day));
            }}
          >
            {day}
          </li>
        ))}

        {nextMonthDays.map((day) => (
          <li
            key={`next-${day}`}
            className={cn(styles.dayItem, styles.grayed)}
            onClick={() => {
              setViewDate(new Date(currentYear, currentMonth + 1, day));
              onSelectDate(new Date(currentYear, currentMonth + 1, day));
            }}
          >
            {day}
          </li>
        ))}
      </ul>
    </div>
  );
};
