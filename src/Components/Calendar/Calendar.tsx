import styles from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import { SelectDateBox } from '@Components/SelectDateBox';
import { SVGIcon } from '@Icons/SVGIcon';
import cn from 'classnames';
import { Modal } from '@Components/Common/Modal/Modal';
import { useLocation } from 'react-router-dom';
import { useGetMonth } from '@Hooks/NetworkHooks';
import { useSetRecoilState } from 'recoil';
import { selectedDateStore } from '@Store/index';
import { formatDate } from '@Utils/FormatDate';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

type PresenterProps = {
  isPrevMonth: boolean;
  isNextMonth: boolean;
  isSelectedDay: boolean;
  itemDay: number;
  isDiaryDay: boolean;
  onClick: () => void;
};

// TODO: [feat] 미래 날짜로 이동하지 못하게 막기
// TODO: [design] selectBox 디자인 수정
// TODO: [refactor] 모달에서 날짜 이동 시 해당 날짜에 데이터 갱신하기

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectDate, setSelectDate] = useState<Date>(new Date()); // 모달에서 선택한 날짜를 저장

  // 선택한 날짜를 recoil에 저장
  const setDate = useSetRecoilState(selectedDateStore);

  useEffect(() => {
    setDate({
      date: currentDate,
    });
  }, [currentDate]);

  // 현재 달의 일기가 있는 날짜를 가져오기
  const location = useLocation();
  const boardId = location.pathname.split('/')[3];
  const currentDateStr = `${currentDate.getFullYear()}-${formatDate(currentDate.getMonth() + 1)}-${formatDate(
    currentDate.getDate(),
  )}`;
  const { mutate: getMonthMutation, isSuccess, data: dateList } = useGetMonth(Number(boardId), currentDateStr);
  const [monthData, setMonthData] = useState<number[]>([]);

  useEffect(() => {
    getMonthMutation();
  }, []);

  useEffect(() => {
    if (isSuccess && dateList.dateList.length > 0) {
      setMonthData(() => dateList.dateList.map((date: string) => Number(date.split('-')[2])));
    }
  }, [isSuccess]);

  // 달 이동하기
  const changeMonth = (date: Date) => {
    setCurrentDate(date);
    setMonthData([]);
    getMonthMutation();
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
  const TdPresenter = ({ isPrevMonth, isNextMonth, isSelectedDay, itemDay, isDiaryDay, onClick }: PresenterProps) => {
    return (
      <td
        className={cn({
          [styles.prevDate]: isPrevMonth,
          [styles.nextDate]: isNextMonth,
          [styles.selectedDate]: !isPrevMonth && !isNextMonth && isSelectedDay,
          [styles.date]: !isSelectedDay,
        })}
        onClick={onClick}
      >
        <p>{itemDay}</p>
        {isDiaryDay && !isNextMonth && !isPrevMonth ? (
          <div className={styles.diaryDot}></div>
        ) : (
          <div className={styles.notDot}></div>
        )}
      </td>
    );
  };

  const buildCalendarTags = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      const itemDay = day.getDate();
      const isPrevMonth = day.getMonth() < currentDate.getMonth();
      const isNextMonth = day.getMonth() > currentDate.getMonth();
      const isSelectedDay = day.getDate() === currentDate.getDate();
      const isDiaryDay = monthData.includes(itemDay);

      const tdProps = { isPrevMonth, isNextMonth, isSelectedDay, itemDay, isDiaryDay };

      const handleClick = (day: Date) => {
        setCurrentDate(day);

        isPrevMonth && changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day.getDate()));
        isNextMonth && changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day.getDate()));
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
            changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
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
              changeMonth(selectDate);
            },
          }}
          content={<SelectDateBox currentMonth={currentDate} setSelectDate={setSelectDate} />}
        >
          <span>
            {currentDate.getFullYear()}년 {formatDate(currentDate.getMonth() + 1)}월
          </span>
        </Modal>
        <button
          onClick={() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            changeMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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
