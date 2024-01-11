import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.scss';

export const RootLayout = () => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.appContaienr}>
        <Outlet />
      </div>
    </div>
  );
};
