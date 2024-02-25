import { SVGIcon } from '@Icons/SVGIcon';
import styles from './Modal.module.scss';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { Typography } from '../Typography';
import { CTAButton } from '../Button';
import { ButtonAs } from '../Button/Button';

type ModalProps = {
  children: React.ReactNode; // 해당 요소 클릭 시 모달 띄우기
  title: string; // 모달의 제목
  className: string; // 모달을 띄울 위치
  content?: React.ReactNode; // 모달의 내용
  button?: {
    // 모달의 버튼
    onClick?: () => void;
    buttonName: string;
    buttonType: ButtonAs;
  };
};

// TODO: [refactor] 현재 모달은 캘린더에서만 사용되고 있음. 다른 코드 참고하여 리팩토링 (+확장 고려해서 다른 곳에서도 사용할 수 있도록)
export const Modal = ({ children, title, className, content, button }: ModalProps) => {
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
          <ModalContent onClose={() => setShowModal(false)} title={title} content={content} button={button} />,
          document.querySelector(className) as Element,
        )}
      {showModal && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
    </>
  );
};

type ModalContentProps = {
  onClose: () => void;
  className?: string;
  title: string;
  content?: React.ReactNode;
  button?: {
    onClick?: () => void;
    buttonName: string;
    buttonType: ButtonAs;
  };
};

const ModalContent = ({ onClose, title, content, className, button }: ModalContentProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.header}>
        <Typography as="h2">{title}</Typography>
        <button onClick={onClose}>
          <SVGIcon name="close" />
        </button>
      </div>
      <div className={styles.content}>{content}</div>
      {button?.buttonType === 'CTA' && (
        <div className={styles.footer}>
          <CTAButton
            children={button.buttonName}
            onClick={() => {
              button.onClick && button.onClick();
              onClose();
            }}
          />
        </div>
      )}
    </div>
  );
};
