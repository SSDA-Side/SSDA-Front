/** Style */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MyboardLayout.module.scss';
import cn from 'classnames';

const tabList = [
  {
    name: '캘린더',
    path: 'calendar',
  },
  {
    name: '모아보기',
    path: 'all',
  },
  {
    name: '새글',
    path: 'new',
  },
];

export const MyboardLayout = () => {
  const navigate = useNavigate();
  const boardId = '1';
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        {tabList.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(`/myboard/${tab.path}/${boardId}`)}
            className={cn({ [styles.active]: location.pathname.includes(tab.path) })}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
