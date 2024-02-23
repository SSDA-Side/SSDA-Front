import { Outlet } from 'react-router-dom';
import styles from './GlobalLayout.module.scss';
import cn from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fontStateStore } from '@Store/index';
import { useGetUser } from '@Hooks/NetworkHooks';
import { useEffect } from 'react';

export const GlobalLayout = () => {
  const fontData = useRecoilState(fontStateStore);
  const setFont = useSetRecoilState(fontStateStore);

  const { data: userData, isSuccess } = useGetUser();

  useEffect(() => {
    if (isSuccess) {
      setFont({ fontType: userData?.font as number });
    }
  }, [isSuccess]);

  return (
    <div
      className={cn(styles.fullContainer, {
        [styles.Pretendard]: fontData[0].fontType === 1,
        [styles.NanumSquare]: fontData[0].fontType === 2,
        [styles.Jeju]: fontData[0].fontType === 3,
        [styles.mini]: fontData[0].fontType === 4,
      })}
    >
      <Outlet />
    </div>
  );
};
