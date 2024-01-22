import { SVGIcon } from '@Icons/SVGIcon';
import styles from './Modal.module.scss';

type ModalProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title: string;
};

export const Modal = ({ setClose, content, title }: ModalProps) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button onClick={() => setClose(false)}>
          <SVGIcon name="close" />
        </button>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
