import { useRecoilState } from 'recoil';
import { bottomSheetStore } from './bottomSheetStore';

export const useBottomSheet = () => {
  const [bottomSheetState, setBottomSheetState] = useRecoilState(bottomSheetStore);

  const openBottomSheet = ({ onSelect }: { onSelect: (emotionId: string) => void }) => {
    setBottomSheetState({
      isOpened: true,
      onEmotionSelect: onSelect,
    });
  };

  const selectEmotion = (emotionId: string) => {
    const { onEmotionSelect } = bottomSheetState;

    onEmotionSelect && onEmotionSelect(emotionId);

    setBottomSheetState({
      isOpened: false,
      onEmotionSelect: null,
    });
  };

  return { isOpened: bottomSheetState.isOpened, openBottomSheet, selectEmotion };
};
