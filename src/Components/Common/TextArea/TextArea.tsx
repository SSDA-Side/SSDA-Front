import styles from './TextArea.module.scss';

type TextAreaProps = {
  placeHolder: string;
};

export const TextArea = ({ placeHolder }: TextAreaProps) => {
  return (
    <div className={styles.fullContainer}>
      <textarea className={styles.textArea} placeholder={placeHolder} />
    </div>
  );
};
