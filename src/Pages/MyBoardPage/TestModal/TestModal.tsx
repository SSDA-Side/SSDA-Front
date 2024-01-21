import { createPortal } from 'react-dom';

import cn from 'classnames';
import styles from './TestModal.module.scss';

const TestModal = ({ open, onClose, children }) => {
  const body = document.querySelector('body')!;

  return (
    open &&
    createPortal(
      <div className={styles.container} onClick={onClose}>
        {children}
      </div>,
      body,
    )
  );
};

const Overlay = () => {
  return <div className={styles.overlay} />;
};

const Content = ({ type = 'modal', children }) => {
  return (
    <div
      className={cn(styles.content, { [styles.contextMenu]: type === 'contextMenu' })}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

TestModal.Overlay = Overlay;
TestModal.Content = Content;

export { TestModal };

// () => {
//   return (
//     <Modal>
//       <Modal.Overlay />
//       <Modal.Content></Modal.Content>
//     </Modal>
//   );
// };
