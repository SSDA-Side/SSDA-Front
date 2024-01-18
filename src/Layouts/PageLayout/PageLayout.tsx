import { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

type PageLayoutProp = {
  header: ReactNode;
  body: ReactNode;
};

export const PageLayout = ({ header, body }: PageLayoutProp) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
