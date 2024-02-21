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
  const diaryLocation = location.pathname.split('/')[2];
  const boardId = location.pathname.split('/')[3];

  const date = location.pathname.split('/').slice(3, 4);
  const [year, month, day] = date[0].split('-');

  const isDiaryDetail = diaryLocation === 'calendar' || diaryLocation === 'all' || diaryLocation === 'new';
  const { data: isNewDiary, isError } = useIsNewDiary(Number(boardId));

  isError && console.error('isNewDiaryData error', isError);

  const onBeforePage = () => {
    location.pathname.includes('new') || location.pathname.includes('all') || location.pathname.includes('calendar')
      ? navigate('/myboard')
      : navigate(`/myboard/calendar/${location.pathname.split('/')[2]}`);
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.header}>
        <button onClick={onBeforePage}>
          <SVGIcon name="left" />
        </button>
        {/* TODO: [feat] 일기장 제목 myboard에서 전달받기 - 주현님과 논의 */}
        <div>{!isDiaryDetail ? `${year}년 ${month}월 ${day}일` : '일기장 제목'}</div>
        {/* TODO: [feat] 버튼 클릭 시 사용자 목록 보여주기 - 주현님과 논의 */}
        {isDiaryDetail ? (
          <button>
            <SVGIcon name="users" />
          </button>
        ) : null}
      </div>
      {isDiaryDetail ? (
        <div className={styles.container}>
          <div className={styles.tabBar}>
            {tabList.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(`/myboard/${tab.path}/${boardId}`)}
                className={cn({
                  [styles.active]: location.pathname.includes(tab.path),
                  [styles.not]: !location.pathname.includes(tab.path),
                })}
              >
                <div>
                  {/* TODO: [style] 선택한 탭이 아닐 경우 색상을 회색으로 변경 */}
                  <SVGIcon name={tab.icon as 'calendar' | 'writepen' | 'openbook'} size={20} />
                  <p>{tab.name}</p>
                  {isNewDiary?.newExist && tab.path === 'new' && <div className={styles.newDiary} />}
                </div>
              </button>
            ))}
          </div>
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
      <button className={styles.addDiary} onClick={() => navigate(`/myboard/${boardId}/write`)}>
        <SVGIcon name="add" size={16} />
      </button>
    </div>
  );
};
