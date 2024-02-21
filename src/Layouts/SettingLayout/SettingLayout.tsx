import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './SettingLayout.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import { Modal } from './Modal';
import cn from 'classnames';

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
  const nivigate = useNavigate();

  return (
    <>
      <div className={cn(styles.container, 'setting-modal')}>
        {location.pathname === '/setting' ? (
          <button onClick={() => nivigate('/myboard')}>
            <SVGIcon name="left" />
          </button>
        ) : (
          <Modal className={'.setting-modal'}>
            <SVGIcon name="left" />
          </Modal>
        )}

        <div className={styles.items}>
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
