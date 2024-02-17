/** Style */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MyboardLayout.module.scss';
import cn from 'classnames';
import { useIsNewDiary } from '@Hooks/NetworkHooks';
import { SVGIcon } from '@Icons/SVGIcon';

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
  const location = useLocation();
  const diaryLocation = location.pathname.split('/')[2];
  const boardId = location.pathname.split('/')[3];

  const date = location.pathname.split('/').slice(3, 4);
  const [year, month, day] = date[0].split('-');

  const isDiaryDetail = diaryLocation === 'calendar' || diaryLocation === 'all' || diaryLocation === 'new';
  const { data: isNewDiary, isError, isSuccess } = useIsNewDiary(Number(boardId));

  isError && console.error('isNewDiaryData error', isError);

  const onBeforePage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.header}>
        <button onClick={onBeforePage}>
          <SVGIcon name="left" />
        </button>
        <div>{!isDiaryDetail ? `${year}년 ${month}월 ${day}일` : '일기장 제목'}</div>
      </div>
      {isDiaryDetail ? (
        <div className={styles.container}>
          <div className={styles.tabBar}>
            {tabList.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(`/myboard/${tab.path}/${boardId}`)}
                className={cn({ [styles.active]: location.pathname.includes(tab.path) })}
              >
                {tab.name}
                {isNewDiary?.newExist && tab.path === 'new' && <div className={styles.newDiary} />}
              </button>
            ))}
          </div>
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
