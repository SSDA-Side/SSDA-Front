import styles from './TextArea.module.scss';
import cn from 'classnames';

type TextAreaProps = {
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// TODO: [refactor] 확장성을 고려하여 리팩토링
export const TextArea = ({ className, ...rest }: TextAreaProps) => {
  return (
    <div className={styles.container}>
      <textarea className={cn(className)} {...rest} />
    </div>
  );
};
