import { atom } from 'recoil';

export type ConfirmState = {
  isOpened: boolean;
  content: string | null;
  onYes: (() => void) | null;
  onNo: (() => void) | null;
};

export const confirmStateStore = atom<ConfirmState>({
  key: 'ConfirmState',
  default: {
    isOpened: false,
    content: null,
    onYes: null,
    onNo: null,
  },
});
