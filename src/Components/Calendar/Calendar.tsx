import { IconButton } from '@Components/Common/Button';
import cn from 'classnames';
import { useMemo } from 'react';
import styles from './Calendar.module.scss';

const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];

export const Calendar = ({
  selectDate,
  viewDate = selectDate,
  onSelectDate,
  onSelectViewDate,
  writtenDates,
}: {
  selectDate: Date;
  viewDate: Date;
  writtenDates: string[];

  onSelectDate: (date: Date) => void;
  onSelectViewDate: (date: Date) => void;
}) => {
  // month는 0부터, day는 1부터
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
        <IconButton icon="left" onClick={() => onSelectViewDate(new Date(currentYear, currentMonth, 0, 10))} />
        <p>{dateLabel}</p>
        <IconButton icon="right" onClick={() => onSelectViewDate(new Date(currentYear, currentMonth + 1, 1, 10))} />
      </div>

      <ul className={styles.calendarContainer}>
        {dayOfWeekNames.map((name) => (
          <li key={name} className={cn(styles.dayItem, styles.headerItem)}>
            {name}
          </li>
        ))}

        {lastMonthDays.map((day) => (
          <li
            key={`last-${currentMonth}${day}`}
            className={cn(styles.dayItem, styles.grayed)}
            onClick={() => {
              onSelectViewDate(new Date(currentYear, currentMonth - 1, day, 10));
              onSelectDate(new Date(currentYear, currentMonth - 1, day, 10));
            }}
          >
            {day}
          </li>
        ))}

        {currentMonthDays.map((day) => (
          <li
            key={`current-${currentMonth}${day}`}
            className={cn(styles.dayItem, {
              [styles.grayed]:
                viewDate.getFullYear() !== selectDate.getFullYear() || viewDate.getMonth() !== selectDate.getMonth(),
              [styles.activeItem]:
                viewDate.getFullYear() === selectDate.getFullYear() &&
                viewDate.getMonth() === selectDate.getMonth() &&
                day === selectDate.getDate(),
              [styles.hasItem]: writtenDates.includes(
                `${viewDate.getFullYear()}-${(viewDate.getMonth() + 1).toString().padStart(2, '0')}-${day
                  .toString()
                  .padStart(2, '0')}`,
              ),
            })}
            onClick={() => {
              onSelectViewDate(new Date(currentYear, currentMonth, day, 10));
              onSelectDate(new Date(currentYear, currentMonth, day, 10));
            }}
          >
            {day}
          </li>
        ))}

        {nextMonthDays.map((day) => (
          <li
            key={`next-${currentMonth}${day}`}
            className={cn(styles.dayItem, styles.grayed)}
            onClick={() => {
              onSelectViewDate(new Date(currentYear, currentMonth + 1, day, 10));
              onSelectDate(new Date(currentYear, currentMonth + 1, day, 10));
            }}
          >
            {day}
          </li>
        ))}
      </ul>
    </div>
  );
};
