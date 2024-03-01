/** Style */
import styles from './PageHeader.module.scss';

/** Type */
import type { PropsWithChildren } from 'react';

type LeftSectionProp = PropsWithChildren;
const LeftSection = ({ children }: LeftSectionProp) => {
  return <div className={styles.group}>{children}</div>;
};

type CenterSectionProp = PropsWithChildren;
const CenterSection = ({ children }: CenterSectionProp) => {
  return <div className={styles.center}>{children}</div>;
};

type RightSectionProp = PropsWithChildren;
const RightSection = ({ children }: RightSectionProp) => {
  return <div className={`${styles.group} ${styles.right}`}>{children}</div>;
};

type PageHeaderProp = PropsWithChildren;
const PageHeader = ({ children }: PageHeaderProp) => {
  return <header className={styles.container}>{children}</header>;
};

PageHeader.Left = LeftSection;
PageHeader.Center = CenterSection;
PageHeader.Right = RightSection;

export { PageHeader };
