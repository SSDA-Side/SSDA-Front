/** Style */
import styles from './PageLayout.module.scss';

/** Type */
import type { ReactNode } from 'react';

type PageLayoutProp = {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
};

export const PageLayout = ({ header, body, footer }: PageLayoutProp) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{body}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
