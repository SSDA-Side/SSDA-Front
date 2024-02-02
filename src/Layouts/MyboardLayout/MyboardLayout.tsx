/** Style */
import { Outlet } from 'react-router-dom';
import styles from './MyboardLayout.module.scss';

export const MyboardLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tabBar}></div>
      <Outlet />
    </div>
  );
};
