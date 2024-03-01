import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { SVGIcon } from '@Icons/SVGIcon';
import { IconName } from '@Type/index';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './TabLayout.module.scss';

const tabs = [
  {
    id: 0,
    name: '달력',
    path: 'calendar',
    icon: 'calendar',
  },
  {
    id: 1,
    name: '모아',
    path: 'all',
    icon: 'openbook',
  },
  {
    id: 2,
    name: '새글',
    path: 'new',
    icon: 'writepen',
  },
];

export const TabLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />

      <div className={styles.sideLayout}>
        <TabList />

        <div className={styles.container}>
          <div className={styles.dashedContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="left" onClick={() => navigate('/myboard')} />
        </PageHeader.Left>

        <PageHeader.Center>
          <Typography as="h4">안뇽안뇽</Typography>
        </PageHeader.Center>

        <PageHeader.Right>
          <IconButton icon="users" onClick={() => {}} />
        </PageHeader.Right>
      </PageHeader>
    </div>
  );
};

const TabList = () => {
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleClick = (id: number, path: string) => {
    setCurrentTabIndex(id);
    navigate(path, { replace: true });
  };

  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabLayout}>
        {tabs.map((tab) => (
          <li key={tab.id} className={styles.tabItem} onClick={() => handleClick(tab.id, tab.path)}>
            <SVGIcon name={tab.icon as IconName} className={styles.size16} />
            <p>{tab.name}</p>

            {currentTabIndex === tab.id && (
              <div className={styles.activeTab}>
                <SVGIcon name={tab.icon as IconName} className={styles.size14} />
                <p>{tab.name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
