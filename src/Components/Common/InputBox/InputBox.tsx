import { useState } from 'react';
import styles from './InputBox.module.scss';
import cn from 'classnames';

type InputBoxProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputBox = ({ className, children, ...rest }: InputBoxProps) => {
  const [inputCount, setInputCount] = useState<number>(0);

  const hadnleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(() => e.target.value.length);
  };

  return (
    <div className={styles.fullContainer}>
      <input
        type="text"
        className={cn(styles.inputBox, className)}
        maxLength={10}
        onChange={hadnleInputChange}
        {...rest}
      />
      <p>
        {children && (
          <span>
            {inputCount}/{children}
          </span>
        )}
      </p>
    </div>
  );
};
