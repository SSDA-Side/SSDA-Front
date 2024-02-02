import { Calendar } from '@Components/Calendar';
import styles from './DiaryCalendarPage.module.scss';
import { DiaryItem } from '@Components/DiaryItem';
import { useRecoilState } from 'recoil';
import { selectedDateStore } from '@Store/index';

export const DiaryCalendarPage = () => {
  const selectedDate = useRecoilState(selectedDateStore);
  const { date } = selectedDate[0];

  return (
    <div className={styles.container}>
      <Calendar />
      <DiaryItem />
    </div>
  );
};
