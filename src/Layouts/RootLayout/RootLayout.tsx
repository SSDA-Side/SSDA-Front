import { useModal } from '@Hooks/useModal';
import { AlertPayload, ComponentPayload, ConfirmPayload, Modal } from '@Store/ModalStore';
import { Outlet } from 'react-router-dom';
import { Alert, BottomSheet, ComponentModal, Confirm } from './OverlayComponent';
import styles from './RootLayout.module.scss';
import { useSheet } from '@Hooks/useSheet';
import { useRecoilState } from 'recoil';
import { fontStateStore } from '@Store/index';
import cn from 'classnames';

export const RootLayout = () => {
  const fontData = useRecoilState(fontStateStore);
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
