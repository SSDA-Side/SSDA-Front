/** Style */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MyboardLayout.module.scss';
import cn from 'classnames';
import { useGetBoardTitle, useIsNewDiary } from '@Hooks/NetworkHooks';
import { SVGIcon } from '@Icons/SVGIcon';
import { useModal } from '@Hooks/useModal';
import { ViewMemberModal } from '@Components/Modals/ViewMemberModal';
import { useRecoilState } from 'recoil';
import { selectedDateStore } from '@Store/index';

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
  const { openComponentModal } = useModal();
  const selectedDate = useRecoilState(selectedDateStore);

  const { data: isNewDiary } = useIsNewDiary(Number(boardId));
  const { data: boardTitle } = useGetBoardTitle(Number(boardId));

  return (
    <div className={styles.boardContainer}>
      <div className={styles.header}>
        <button onClick={() => navigate('/myboard')}>
          <SVGIcon name="left" />
        </button>
        <div>{boardTitle?.boardTitle}</div>
        {boardTitle && (
          <button
            onClick={() => {
              openComponentModal({
                title: '멤버 보기',
                children: ViewMemberModal,
                props: {
                  board: { id: +boardId, title: boardTitle?.boardTitle },
                },
              });
            }}
          >
            <SVGIcon name="users" />
          </button>
        )}
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
        <button className={styles.addDiary} onClick={() => navigate(`/myboard/${boardId}/write?date=${selectedDate}`)}>
          <SVGIcon name="add" size={16} />
        </button>
      </div>
    </div>
  );
};
