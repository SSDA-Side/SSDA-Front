import { atom } from 'recoil';

type BottomSheetStateType = {
  isOpened: boolean;
  onEmotionSelect: ((emotionId: string) => void) | null;
};

export const bottomSheetStore = atom<BottomSheetStateType>({
  key: 'BottomSheetState',
  default: {
    isOpened: false,
    onEmotionSelect: null,
  },
});
