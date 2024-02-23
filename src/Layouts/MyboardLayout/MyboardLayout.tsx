/** Style */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MyboardLayout.module.scss';
import cn from 'classnames';
import { useIsNewDiary } from '@Hooks/NetworkHooks';
import { SVGIcon } from '@Icons/SVGIcon';

const tabList = [
  {
    name: '달력',
    path: 'calendar',
    icon: 'calendar',
  },
  {
    name: '모아',
    path: 'all',
    icon: 'openbook',
  },
  {
    name: '새글',
    path: 'new',
    icon: 'writepen',
  },
];

export const MyboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];

  const { data: isNewDiary } = useIsNewDiary(Number(boardId));

  return (
    <div className={styles.boardContainer}>
      <div className={styles.header}>
        <button onClick={() => navigate('/myboard')}>
          <SVGIcon name="left" />
        </button>
        {/* TODO: [feat] 제목 변경하기 */}
        <div>{}</div>
        {/* TODO: [feat] 버튼 클릭 시 사용자 목록 보여주기 - 주현님과 논의 */}
        <button>
          <SVGIcon name="users" />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.tabBar}>
          {tabList.map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(`/myboard/${boardId}/${tab.path}`)}
              className={cn({
                [styles.active]: location.pathname.includes(tab.path),
                [styles.not]: !location.pathname.includes(tab.path),
              })}
            >
              <div>
                <SVGIcon name={tab.icon as 'calendar' | 'writepen' | 'openbook'} size={20} />
                <p>{tab.name}</p>
                {isNewDiary?.newExist && tab.path === 'new' && <div className={styles.newDiary} />}
              </div>
            </button>
          ))}
        </div>
        <Outlet />
      </div>
      <button className={styles.addDiary} onClick={() => navigate(`/myboard/${boardId}/write`)}>
        <SVGIcon name="add" size={16} />
      </button>
    </div>
  );
};
