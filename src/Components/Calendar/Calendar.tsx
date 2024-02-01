import styles from './Calendar.module.scss';
import { useState } from 'react';
import { Modal } from '@Components/Common/Modal';
import { SelectDateBox } from '@Components/SelectDateBox';
import { SVGIcon } from '@Icons/SVGIcon';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

export const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <p>{day.getDate()}</p>
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
            <p>{day.getDate()}</p>
          </td>
        );
      }
      return (
        <td
          key={i}
          onClick={() => onClickDay(day.getDate())}
          className={day.getDate() === selectedDay ? styles.selectedDate : styles.date}
        >
          <p>{day.getDate()}</p>
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
      {isModalOpen && (
        <Modal
          setClose={setIsModalOpen}
          title="캘린더 날짜 선택"
          content={
            <SelectDateBox
              setCurrentMonth={setCurrentMonth}
              setIsModalOpen={setIsModalOpen}
              onClickDay={onClickDay}
              currentMonth={currentMonth}
            />
          }
        />
      )}
      <div className={styles.nav}>
        <button
          onClick={() => {
            onClickDay(1);
            prevMonth();
          }}
        >
          <SVGIcon name="left" />
        </button>
        <button onClick={() => setIsModalOpen(true)}>
          <span>
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() > 8 ? null : '0'}
            {currentMonth.getMonth() + 1}월
          </span>
        </button>
        <button
          onClick={() => {
            onClickDay(1);
            nextMonth();
          }}
        >
          <SVGIcon name="right" />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={`week-${i}`}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((row: JSX.Element[], i: number) => (
            <tr key={`day-${i}`}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
