import { confirmStateStore } from '@Store/index';
import { useRecoilState } from 'recoil';

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useRecoilState(confirmStateStore);
  const { isOpened, content, onYes, onNo } = confirmState;

  const showConfirm = (content: string, { onYes, onNo }: { onYes: () => void; onNo: () => void }) =>
    setConfirmState({
      isOpened: true,
      content,
      onNo,
      onYes,
    });

  const closeConfirm = () => setConfirmState({ isOpened: false, content: null, onNo: null, onYes: null });

  const confirmWithYes = () => {
    onYes && onYes();
    closeConfirm();
  };

  const confirmWithNo = () => {
    onNo && onNo();
    closeConfirm();
  };

  return {
    isOpened,
    content,
    showConfirm,
    confirmWithYes,
    confirmWithNo,
  };
};
