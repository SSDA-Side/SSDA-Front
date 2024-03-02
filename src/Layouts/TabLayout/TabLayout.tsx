import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { SVGIcon } from '@Icons/SVGIcon';
import { IconName } from '@Type/index';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './TabLayout.module.scss';
import { useGetBoardTitle } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { ViewMemberModal } from '@Components/Modals/ViewMemberModal';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

export const SelectedDateByUserStore = atom({
  key: 'selectedDateByUser',
  default: new Date(),
});

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
  const navigate = useNavigate();
  const { boardId } = useParams();
  const selectedDateByUser = useRecoilValue(SelectedDateByUserStore);
  const mutatedDate = selectedDateByUser.toISOString().split('T')[0];

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

      <div className={styles.addButtonWrapper}>
        <button onClick={() => navigate(`/myboard/${boardId}/write?date=${mutatedDate}`)}>
          <SVGIcon name="add" className={styles.size32} />
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const params = useParams();
  const { boardId } = params;

  const { data } = useGetBoardTitle(Number(boardId!));
  const navigate = useNavigate();

  const { boardTitle } = data || { boardTitle: '-' };

  const { openComponentModal } = useModal();

  return (
    <div className={styles.header}>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="left" onClick={() => navigate('/myboard')} />
        </PageHeader.Left>

        <PageHeader.Center>
          <Typography as="h4">{boardTitle}</Typography>
        </PageHeader.Center>

        <PageHeader.Right>
          <IconButton
            icon="users"
            onClick={() => {
              openComponentModal({
                title: '멤버 보기',
                children: ViewMemberModal,
                props: {
                  board: { id: Number(boardId), title: boardTitle },
                },
              });
            }}
          />
        </PageHeader.Right>
      </PageHeader>
    </div>
  );
};

const TabList = () => {
  const location = useLocation();
  const currentTab = tabs.find((tab) => tab.path === location.pathname.split('/')[3])?.id || 0;

  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(currentTab);

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
