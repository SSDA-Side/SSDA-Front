import styles from './Calendar.module.scss';
import { useState } from 'react';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

export const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [currentMonth, setCurrentMonth] = useState<Date>(today);

  // 클릭한 날짜를 선택하고, 선택한 날짜를 저장하는 함수
  const onClickDay = (day: number) => {
    setSelectedDay(day);
  };

  // 달 이동하기
  const chageMonth = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, currentMonth.getDate()));
  };

  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    chageMonth(currentMonth.getMonth() - 1);
  };

  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    chageMonth(currentMonth.getMonth() + 1);
  };

  // 달력에 표시할 날짜를 만드는 함수
  const buildCalendarDays = () => {
    const prevDateNum = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const curDateNum = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const prevMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const nextMonthStartDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    const days: Date[] = [];

    days.push(
      ...Array.from({ length: prevDateNum }, (_, i) => {
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthEndDate.getDate() - i);
      }).reverse(),
      ...Array.from(
        { length: curDateNum },
        (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1),
      ),
    );
    days.push(
      ...Array.from(
        { length: 7 - (days.length % 7) < 7 ? 7 - (days.length % 7) : 0 },
        (_, i) => new Date(nextMonthStartDate.getFullYear(), nextMonthStartDate.getMonth(), i + 1),
      ),
    );

    return days;
  };

  // 달력에 표시할 날짜를 태그로 만드는 함수
  const buildCalendarTags = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <td
            key={i}
            className={styles.prevDate}
            onClick={() => {
              onClickDay(day.getDate());
              prevMonth();
            }}
          >
            {day.getDate()}
          </td>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <td
            key={i}
            className={styles.nextDate}
            onClick={() => {
              onClickDay(day.getDate());
              nextMonth();
            }}
          >
            {day.getDate()}
          </td>
        );
      }
      return (
        <td
          key={i}
          onClick={() => onClickDay(day.getDate())}
          className={day.getDate() === selectedDay ? styles.selectedDate : styles.date}
        >
          {day.getDate()}
        </td>
      );
    });
  };

  // 달력을 일주일 단위로 나누는 함수
  const buildCalendarWeek = (calendarTags: JSX.Element[]) => {
    const weeks: JSX.Element[][] = [];

    calendarTags.forEach((day, index) => {
      if (!weeks[Math.floor(index / 7)]) {
        weeks[Math.floor(index / 7)] = [day];
      } else {
        weeks[Math.floor(index / 7)].push(day);
      }
    });

    return weeks;
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTags(calendarDays);
  const calendarWeeks = buildCalendarWeek(calendarTags);

  return (
    <div className={styles.calendar}>
      <div className={styles.nav}>
        <button
          onClick={() => {
            onClickDay(1);
            prevMonth();
          }}
        >
          &lt;
        </button>
        <span>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월 {selectedDay}일
        </span>
        <button
          onClick={() => {
            onClickDay(1);
            nextMonth();
          }}
        >
          &gt;
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((row: JSX.Element[], i: number) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
