import { SVGIcon } from '@Icons/SVGIcon';
import { settingList } from '@Layouts/SettingLayout/SettingLayout';
import styles from './Setting.module.scss';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '@Utils/Cookies';

export const SettingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('accessToken');
    alert('로그아웃 하셨습니다.');
    navigate('/');
  };

  const onPageMove = (page: string) => {
    page === '' ? handleLogout() : navigate(page);
  };

  return (
    <div className={styles.container}>
      {settingList.map((setting, index) => {
        if (index === settingList.length - 1) return;
        return (
          <button key={index} className={styles.settingItem} onClick={() => onPageMove(setting.path)}>
            {setting.name}
            <SVGIcon name="right" />
          </button>
        );
      })}
    </div>
  );
};
