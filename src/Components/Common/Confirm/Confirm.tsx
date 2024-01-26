import { useEffect } from 'react';
import styles from './Confirm.module.scss';

import { useConfirm } from '@Hooks/useConfirm';

export const Confirm = () => {
  const { isOpened, content, confirmWithNo, confirmWithYes } = useConfirm();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        confirmWithNo();
      }
    };

    if (isOpened) {
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [isOpened]);

  return (
    isOpened && (
      <div className={styles.container} onClick={confirmWithNo}>
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <div className={styles.contentSection}>{content}</div>

          <div className={styles.buttonSection}>
            <button onClick={confirmWithNo}>노노</button>
            <button onClick={confirmWithYes}>넹</button>
          </div>
        </div>
      </div>
    )
  );
};
