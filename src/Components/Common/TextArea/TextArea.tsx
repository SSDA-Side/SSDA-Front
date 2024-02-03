import styles from './TextArea.module.scss';
import cn from 'classnames';

type TextAreaProps = {
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ className, ...rest }: TextAreaProps) => {
  return (
    <div className={styles.container}>
      <textarea className={cn(className)} {...rest} />
    </div>
  );
};
