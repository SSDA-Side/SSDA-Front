import { useLocation } from 'react-router-dom';
import styles from './SettingLayout.module.scss';

const settingList = [
  {
    name: '설정',
    path: '/setting',
  },
];

export const SettingLayout = () => {
  const location = useLocation();
  console.log(location);

  return <div className={styles.container}></div>;
};
