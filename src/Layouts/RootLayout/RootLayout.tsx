import { useModal } from '@Hooks/useModal';
import { AlertPayload, ComponentPayload, ConfirmPayload, Modal } from '@Store/ModalStore';
import { Outlet } from 'react-router-dom';
import { Alert, BottomSheet, ComponentModal, Confirm } from './OverlayComponent';
import styles from './RootLayout.module.scss';
import { useSheet } from '@Hooks/useSheet';
import cn from 'classnames';
import { useGetUser } from '@Hooks/NetworkHooks';

export const RootLayout = () => {
  // const fontData = useRecoilState(fontStateStore);
  const { data: userData } = useGetUser();

  console.log('userData', userData);

  return (
    <div
      className={cn(styles.fullContainer, {
        [styles.Pretendard]: (userData?.font as number) === 1,
        [styles.NanumSquare]: (userData?.font as number) === 2,
        [styles.Jeju]: (userData?.font as number) === 3,
        [styles.mini]: (userData?.font as number) === 4,
      })}
    >
      <div className={styles.appContaienr}>
        <Outlet />
        <ModalController />
        <SheetController />
      </div>
    </div>
  );
};

const ModalController = () => {
  const { modals } = useModal();

  const getTypedComponent = ({ id, type, isOpened, payload }: Modal) => {
    if (type === 'Component') {
      return <ComponentModal id={id} isOpened={isOpened} {...(payload as ComponentPayload)} />;
    }

    if (type === 'Alert') {
      return <Alert id={id} isOpened={isOpened} {...(payload as AlertPayload)} />;
    }

    if (type === 'Confirm') {
      return <Confirm id={id} isOpened={isOpened} {...(payload as ConfirmPayload)} />;
    }
  };

  return modals.map(getTypedComponent);
};

const SheetController = () => {
  const { bottomSheet } = useSheet();

  const { isOpened, ...bottomSheetProps } = bottomSheet;

  return <BottomSheet isOpened={isOpened} {...bottomSheetProps} />;
};
