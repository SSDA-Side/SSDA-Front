import styles from './TextArea.module.scss';

type TextAreaProps = {
  placeHolder: string;
};

export const TextArea = ({ placeHolder }) => {
  return (
    <div className={styles.fullContainer}>
      <textarea className={styles.textArea} placeholder={placeHolder} />
    </div>
  );
};
