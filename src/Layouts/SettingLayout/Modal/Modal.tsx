import styles from './Modal.module.scss';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  children: React.ReactNode; // 해당 요소 클릭 시 모달 띄우기
  className: string; // 모달을 띄울 위치
};

// TODO: [refactor] 현재 모달은 setting 사용되고 있음. 다른 코드 참고하여 리팩토링
export const Modal = ({ children, className }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        {children}
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.querySelector(className) as Element,
        )}
      {showModal && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
    </>
  );
};

type ModalContentProps = {
  onClose: () => void;
  className?: string;
  content?: React.ReactNode;
};

const ModalContent = ({ onClose, className }: ModalContentProps) => {
  const navigate = useNavigate();

  const onBeforePage = () => {
    navigate('/setting');
    onClose();
  };
  return (
    <div className={cn(styles.modalContainer, className)}>
      <div className={styles.header}>
        <span>수정중인 내용을</span>
        <br />
        <span>저장하지 않고 나가시겠습니까?</span>
      </div>
      <div className={styles.footer}>
        <button onClick={onBeforePage}>예</button>
        <button onClick={onClose}>아니요</button>
      </div>
    </div>
  );
};
