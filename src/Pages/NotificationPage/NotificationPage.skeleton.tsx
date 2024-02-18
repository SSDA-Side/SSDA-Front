import styles from './NotificationPage.module.scss';

import cn from 'classnames';

export const PageLoadingUI = () => {
  return (
    <>
      <div className={styles.skeletonItem} style={{ width: '50%', height: '1rem' }} />
      <div className={cn(styles.skeletonItem, styles.leftSelf)} style={{ width: '5.625rem', height: '1.75rem' }} />

      <ul className={styles.skeletonList}>
        <li className={styles.skeletonContainer}>
          <div className={styles.skeletonItem} style={{ minWidth: '2.5rem', maxHeight: '2.5rem' }} />
          <div className={styles.contentList}>
            <div className={styles.skeletonItem} style={{ width: '30%', height: '0.875rem' }} />

            <div className={styles.textGroup}>
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
            </div>

            <div className={styles.skeletonItem} style={{ width: '50%', height: '.875rem' }} />
          </div>
        </li>
        <li className={styles.skeletonContainer}>
          <div className={styles.skeletonItem} style={{ minWidth: '2.5rem', maxHeight: '2.5rem' }} />
          <div className={styles.contentList}>
            <div className={styles.skeletonItem} style={{ width: '30%', height: '0.875rem' }} />

            <div className={styles.textGroup}>
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
            </div>

            <div className={styles.skeletonItem} style={{ width: '50%', height: '.875rem' }} />
          </div>
        </li>
        <li className={styles.skeletonContainer}>
          <div className={styles.skeletonItem} style={{ minWidth: '2.5rem', maxHeight: '2.5rem' }} />
          <div className={styles.contentList}>
            <div className={styles.skeletonItem} style={{ width: '30%', height: '0.875rem' }} />

            <div className={styles.textGroup}>
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
            </div>

            <div className={styles.skeletonItem} style={{ width: '50%', height: '.875rem' }} />
          </div>
        </li>
      </ul>
    </>
  );
};
