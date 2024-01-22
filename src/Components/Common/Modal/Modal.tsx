import styles from './styles.module.scss';

type ModalProps = {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  title: string;
  footer: React.ReactNode;
};

export const Modal = ({ setClose, content, title, footer }: ModalProps) => {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button onClick={() => setClose(false)}>X</button>
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};
