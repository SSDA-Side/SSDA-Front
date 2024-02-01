import { Calendar } from '@Components/Calendar';
import styles from './DiaryPage.module.scss';

export const DiaryPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tabBar}></div>
      <Calendar />
    </div>
  );
};
