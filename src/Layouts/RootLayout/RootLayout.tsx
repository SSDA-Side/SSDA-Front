import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.scss';
import { Confirm } from '@Components/Common/Confirm';

export const RootLayout = () => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.appContaienr}>
        <Outlet />
        <Confirm />
      </div>
    </div>
  );
};
