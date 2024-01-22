import { CTAButton } from '@Components/Common/Button';
import styles from './SelectDateBox.module.scss';
import { useState } from 'react';

type SelectDateBoxProps = {
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDay: (day: number) => void;
  currentMonth: Date;
};

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export const SelectDateBox = ({ setCurrentMonth, setIsModalOpen, onClickDay, currentMonth }: SelectDateBoxProps) => {
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  // select box에서 선택한 연도와 달을 받아와서, 해당 날짜를 저장하는 함수
  const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    id === 'year'
      ? setSelectDate((selectDate) => new Date(Number(value), selectDate.getMonth()))
      : setSelectDate((selectDate) => new Date(selectDate.getFullYear(), Number(value) - 1));
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.selectContainer}>
        <div>
          <span>YEAR</span>
          <select id="year" onChange={onChangeDate}>
            {years.map((year) => {
              return (
                <>
                  {currentMonth.getFullYear() === year ? (
                    <option key={year} value={year} selected>
                      {year}
                    </option>
                  ) : (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )}
                </>
              );
            })}
          </select>
        </div>
        <div>
          <span>MONTH</span>
          <select id="month" onChange={onChangeDate}>
            {months.map((month) => {
              return (
                <>
                  {currentMonth.getMonth() + 1 === month ? (
                    <option key={month} value={month} selected>
                      {month}
                    </option>
                  ) : (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  )}
                </>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <CTAButton
          children="완료"
          onClick={() => {
            onClickDay(1);
            setCurrentMonth(selectDate);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};
