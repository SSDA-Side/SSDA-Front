import styles from './SelectDateBox.module.scss';

type SelectDateBoxProps = {
  currentMonth: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
};

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export const SelectDateBox = ({ currentMonth, setSelectDate }: SelectDateBoxProps) => {
  // select box에서 선택한 연도와 달을 받아와서, 해당 날짜를 저장하는 함수
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    id === 'year'
      ? setSelectDate((selectDate) => new Date(Number(value), selectDate.getMonth()))
      : setSelectDate((selectDate) => new Date(selectDate.getFullYear(), Number(value) - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <div>
          <span>YEAR</span>
          <select id="year" onChange={handleChangeDate} defaultValue={currentMonth.getFullYear()}>
            {years.map((year) => (
              <option key={`year-${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>MONTH</span>
          <select id="month" onChange={handleChangeDate} defaultValue={currentMonth.getMonth() + 1}>
            {months.map((month) => (
              <option key={`month-${month}`} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
