import { useModal } from '@Hooks/useModal';
import { AlertPayload, ComponentPayload, ConfirmPayload, Modal } from '@Store/ModalStore';
import { Outlet } from 'react-router-dom';
import { Alert, BottomSheet, ComponentModal, Confirm } from './OverlayComponent';
import styles from './RootLayout.module.scss';
import { useSheet } from '@Hooks/useSheet';

export const RootLayout = () => {
  return (
    <div className={styles.fullContainer}>
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
      return <ComponentModal key={id} id={id} isOpened={isOpened} {...(payload as ComponentPayload)} />;
    }

    if (type === 'Alert') {
      return <Alert key={id} id={id} isOpened={isOpened} {...(payload as AlertPayload)} />;
    }

    if (type === 'Confirm') {
      return <Confirm key={id} id={id} isOpened={isOpened} {...(payload as ConfirmPayload)} />;
    }
  };

  return modals.map(getTypedComponent);
};

const SheetController = () => {
  const { bottomSheet } = useSheet();

  const { isOpened, ...bottomSheetProps } = bottomSheet;

  return <BottomSheet isOpened={isOpened} {...bottomSheetProps} />;
};
