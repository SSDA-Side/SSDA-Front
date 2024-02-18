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

export type SelectedState = {
  date: Date;
};

export const selectedDateStore = atom<SelectedState>({
  key: 'SelectedState',
  default: {
    date: new Date(),
  },
});

export type FontState = {
  fontType: number;
};

export const fontStateStore = atom<FontState>({
  key: 'FontState',
  default: {
    fontType: 0,
  },
});
