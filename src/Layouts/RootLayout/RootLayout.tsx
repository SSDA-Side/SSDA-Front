import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.scss';
import { Confirm } from '@Components/Common/Confirm';
import { useRecoilState } from 'recoil';
import { fontStateStore } from '@Store/index';
import cn from 'classnames';

export const RootLayout = () => {
  const fontData = useRecoilState(fontStateStore);
  console.log(fontData[0].fontType);
  return (
    <div
      className={cn(styles.fullContainer, {
        [styles.Pretendard]: fontData[0].fontType === 0,
        [styles.NanumSquare]: fontData[0].fontType === 1,
        [styles.Jeju]: fontData[0].fontType === 2,
        [styles.mini]: fontData[0].fontType === 3,
      })}
    >
      <div className={styles.appContaienr}>
        <Outlet />
        <Confirm />
      </div>
    </div>
  );
};
