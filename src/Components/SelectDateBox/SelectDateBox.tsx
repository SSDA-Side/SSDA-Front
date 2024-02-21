import { useEffect, useState } from 'react';
import styles from './SelectDateBox.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import cn from 'classnames';

type SelectDateBoxProps = {
  currentMonth: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
};

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export const SelectDateBox = ({ currentMonth, setSelectDate }: SelectDateBoxProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState({
    year: false,
    month: false,
  });

  const [dateList, setDateList] = useState({
    year: currentMonth.getFullYear(),
    month: currentMonth.getMonth() + 1,
  });

  useEffect(() => {
    setSelectDate(new Date(dateList.year, dateList.month - 1));
  }, [dateList]);

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <div>
          <span>YEAR</span>
          <button
            id="year"
            onClick={() => {
              setIsButtonClicked({ ...isButtonClicked, year: !isButtonClicked.year });
            }}
          >
            <span>{dateList.year}</span>
            {isButtonClicked.year ? <SVGIcon name="down" size={9} /> : <SVGIcon name="up" size={9} />}
          </button>
          <div
            className={cn({
              [styles.active]: isButtonClicked.year,
            })}
          >
            <ul>
              {isButtonClicked.year &&
                years.map((year) => (
                  <li
                    key={`year-${year}`}
                    value={year}
                    onClick={(e) => {
                      setDateList({ ...dateList, year: Number(e.target.value) });
                      setIsButtonClicked({ ...isButtonClicked, year: false });
                    }}
                  >
                    {year}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div>
          <span>MONTH</span>
          <button
            id="month"
            onClick={() => {
              setIsButtonClicked({ ...isButtonClicked, month: !isButtonClicked.month });
            }}
          >
            <span>{dateList.month}</span>
            {isButtonClicked.month ? <SVGIcon name="down" size={9} /> : <SVGIcon name="up" size={9} />}
          </button>
          <div
            className={cn({
              [styles.active]: isButtonClicked.month,
            })}
          >
            <ul>
              {isButtonClicked.month &&
                months.map((month) => (
                  <li
                    key={`month-${month}`}
                    value={month}
                    onClick={(e) => {
                      setDateList({ ...dateList, month: Number(e.target.value) });
                      setIsButtonClicked({ ...isButtonClicked, month: false });
                    }}
                  >
                    {month}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
