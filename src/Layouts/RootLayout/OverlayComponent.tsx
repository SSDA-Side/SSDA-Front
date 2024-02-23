import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { useModal } from '@Hooks/useModal';
import { PageLayout } from '@Layouts/PageLayout';
import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styles from './OverlayComponent.module.scss';
import { AlertPayload, ComponentPayload, ConfirmPayload } from '@Store/ModalStore';
import { BottomSheetType } from '@Store/SheetShore';
import { useSheet } from '@Hooks/useSheet';

type ModalProp = PropsWithChildren<{ isOpened: boolean; onClose: () => void }>;
const Modal = ({ isOpened, onClose, children }: ModalProp) => {
  const body = document.querySelector('body')!;

  return (
    isOpened &&
    createPortal(
      <div className={styles.modalContainer} onClick={onClose}>
        {children}
      </div>,
      body,
    )
  );
};

const Overlay = () => {
  return <div className={styles.overlay} />;
};

const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

const ConfirmAlertBox = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.confirmAlertBox} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

const BottomSheetBox = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.bottomSheetBox} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;
Modal.Confirm = ConfirmAlertBox;
Modal.Alert = ConfirmAlertBox;
Modal.BottomSheet = BottomSheetBox;

type ComponentModalProp = { id: string; isOpened: boolean } & ComponentPayload;
export const ComponentModal = ({ id, isOpened, ...payload }: ComponentModalProp) => {
  const { closeModal, openAlert } = useModal();

  const { children: ModalElement, title, onClose, isSubmitting } = payload;

  const handleClose = () => {
    closeModal(id);
    onClose && onClose();
  };

  const header = (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2" onClick={() => openAlert({ contents: '그래 인마!' })}>
          {title}
        </Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={handleClose} disabled={isSubmitting} />
      </PageHeader.Right>
    </PageHeader>
  );

  return (
    <Modal isOpened={isOpened} onClose={handleClose}>
      <Modal.Overlay />
      <Modal.Content>
        <PageLayout header={header} body={<ModalElement modalId={id} />} />
      </Modal.Content>
    </Modal>
  );
};

type AlertProp = { id: string; isOpened: boolean } & AlertPayload;
export const Alert = ({ id, isOpened, ...payload }: AlertProp) => {
  const { closeModal } = useModal();

  const { contents, onYes } = payload;

  const handleYes = () => {
    closeModal(id);
    onYes && onYes();
  };

  return (
    <Modal isOpened={isOpened} onClose={() => {}}>
      <Modal.Overlay />
      <Modal.Alert>
        <div className={styles.contentBox}>{contents}</div>
        <div className={styles.buttons}>
          <button onClick={handleYes}>예</button>
        </div>
      </Modal.Alert>
    </Modal>
  );
};

type ConfirmProp = { id: string; isOpened: boolean } & ConfirmPayload;
export const Confirm = ({ id, isOpened, ...payload }: ConfirmProp) => {
  const { closeModal } = useModal();

  const { contents, isReversedOrder, onNo, onYes } = payload;

  const handleYes = () => {
    closeModal(id);
    onYes && onYes();
  };

  const handleNo = () => {
    closeModal(id);
    onNo && onNo();
  };

  return (
    <Modal isOpened={isOpened} onClose={() => {}}>
      <Modal.Overlay />
      <Modal.Confirm>
        <div className={styles.contentBox}>{contents}</div>
        <div className={cn({ [styles.reverseButton]: isReversedOrder }, styles.buttons)}>
          <button onClick={handleYes}>예</button>
          <button onClick={handleNo}>아니오</button>
        </div>
      </Modal.Confirm>
    </Modal>
  );
};

export const BottomSheet = ({ id, isOpened, ...payload }: BottomSheetType) => {
  const { openAlert } = useModal();
  const { closeBottomSheet } = useSheet();

  const { children: SheetElement, title, onClose } = payload;

  const handleClose = () => {
    closeBottomSheet();
    onClose && onClose();
  };

  const header = (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2" onClick={() => openAlert({ contents: '그래 인마!' })}>
          {title}
        </Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={handleClose} />
      </PageHeader.Right>
    </PageHeader>
  );

  return (
    <Modal isOpened={isOpened} onClose={handleClose}>
      <Modal.Overlay />
      <Modal.BottomSheet>
        {SheetElement && <PageLayout header={header} body={<SheetElement sheetId={id} />} />}
      </Modal.BottomSheet>
    </Modal>
  );
};
