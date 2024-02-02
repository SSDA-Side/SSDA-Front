import { Calendar } from '@Components/Calendar';
import styles from './DiaryCalendarPage.module.scss';

export const DiaryCalendarPage = () => {
  return (
    <div className={styles.container}>
      <Calendar />
    </div>
  );
};
