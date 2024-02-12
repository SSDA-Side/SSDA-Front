import { SVGIcon } from '@Icons/SVGIcon';
import { settingList } from '@Layouts/SettingLayout/SettingLayout';
import styles from './Setting.module.scss';
import { useNavigate } from 'react-router-dom';

export const SettingPage = () => {
  const navigate = useNavigate();

  const onPageMove = (page: string) => {
    navigate(page);
  };

  return (
    <div className={styles.container}>
      {settingList.map((setting, index) => {
        if (index === 5) return;
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
