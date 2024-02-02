import styles from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import { SelectDateBox } from '@Components/SelectDateBox';
import { SVGIcon } from '@Icons/SVGIcon';
import cn from 'classnames';
import { Modal } from '@Components/Common/Modal/Modal';
import { useLocation } from 'react-router-dom';
import { useGetMonth } from '@Hooks/NetworkHooks';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

type PresenterProps = {
  isPrevMonth: boolean;
  isNextMonth: boolean;
  isSelectedDay: boolean;
  itemDay: number;
  onClick: () => void;
};

export const Calendar = () => {
  // const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const location = useLocation();
  const boardId = location.pathname.split('/')[3];

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  // const { data, error, isLoading, isError } = useGetMonth(boardId, );

  // 달 이동하기
  const chageMonth = (date: Date) => {
    setCurrentDate(date);
  };

  // 달력에 표시할 날짜를 만드는 함수
  const buildCalendarDays = () => {
    const prevDateNum = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const curDateNum = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const prevMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const nextMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const days: Date[] = [];

    days.push(
      ...Array.from({ length: prevDateNum }, (_, i) => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthEndDate.getDate() - i);
      }).reverse(),
      ...Array.from(
        { length: curDateNum },
        (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
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
  const TdPresenter = ({ isPrevMonth, isNextMonth, isSelectedDay, itemDay, onClick }: PresenterProps) => {
    return (
      <td
        className={cn({
          [styles.prevDate]: isPrevMonth,
          [styles.nextDate]: isNextMonth,
          [styles.selectedDate]: !isPrevMonth && !isNextMonth && isSelectedDay,
        })}
        onClick={onClick}
      >
        <p>{itemDay}</p>
      </td>
    );
  };

  const buildCalendarTags = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      const itemDay = day.getDate();
      const isPrevMonth = day.getMonth() < currentDate.getMonth();
      const isNextMonth = day.getMonth() > currentDate.getMonth();
      const isSelectedDay = day.getDate() === currentDate.getDate();

      const tdProps = { isPrevMonth, isNextMonth, isSelectedDay, itemDay };

      const handleClick = (day: Date) => {
        isPrevMonth && chageMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day.getDate()));
        isNextMonth && chageMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day.getDate()));
      };

      return (
        <TdPresenter
          key={`day-${i}`}
          {...tdProps}
          onClick={() => {
            handleClick(day);
          }}
        />
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
    <div className={cn(styles.calendar, 'calendar-modal')}>
      <div className={styles.nav}>
        <button
          onClick={() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            chageMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
          }}
        >
          <SVGIcon name="left" />
        </button>
        <Modal
          title="캘린더 날짜 선택"
          className={'.calendar-modal'}
          button={{
            buttonName: '완료',
            buttonType: 'CTA',
            onClick: () => {
              setCurrentDate(selectDate);
            },
          }}
          content={<SelectDateBox currentMonth={currentDate} setSelectDate={setSelectDate} />}
        >
          <span>
            {currentDate.getFullYear()}년 {currentDate.getMonth() > 8 ? null : '0'}
            {currentDate.getMonth() + 1}월
          </span>
        </Modal>
        <button
          onClick={() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            chageMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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
