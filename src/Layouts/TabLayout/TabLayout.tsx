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
        <Outlet />
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
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
  );
};

const TabList = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabLayout}>
        {tabs.map((tab) => (
          <li key={tab.id} className={styles.tabItem} onClick={() => setCurrentTabIndex(tab.id)}>
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
