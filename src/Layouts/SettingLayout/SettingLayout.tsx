import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './SettingLayout.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';

export const settingList = [
  {
    path: '/setting/profile',
    name: '프로필 수정',
  },
  {
    path: '/setting/font',
    name: '폰트 설정',
  },
  // {
  //   path: '/setting/cloud',
  //   name: '백업/복구',
  // },
  {
    path: '/setting/feedback',
    name: '의견 보내기',
  },
  {
    path: '',
    name: '로그아웃',
  },
  {
    name: '설정',
    path: '/setting',
  },
];

export const SettingLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onBeforePage = () => {
    location.pathname === '/setting' ? navigate('/myboard') : navigate('/setting');
  };

  return (
    <>
      <div className={styles.container}>
        <button onClick={onBeforePage}>
          <SVGIcon name="left" />
        </button>
        <div>
          {settingList.map((settingItem) => {
            if (settingItem.path === location.pathname) {
              return settingItem.name;
            }
          })}
        </div>
      </div>
      <div className={styles.contents}>
        <Outlet />
      </div>
    </>
  );
};
