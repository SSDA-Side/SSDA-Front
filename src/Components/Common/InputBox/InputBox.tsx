import { useState } from 'react';
import styles from './InputBox.module.scss';

type InputBoxProps = {
  placeHolder: string;
};

export const InputBox = ({ placeHolder }: InputBoxProps) => {
  const [inputCount, setInputCount] = useState<number>(0);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(() => e.target.value.length);
  };

  return (
    <div className={styles.fullContainer}>
      <input
        type="text"
        className={styles.inputBox}
        placeholder={placeHolder}
        maxLength={10}
        onChange={onInputChange}
      />
      <p>
        <span>{inputCount}</span>
        <span>/10</span>
      </p>
    </div>
  );
};
