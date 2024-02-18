import { Board } from '@Type/Model';
import { ComponentType } from 'react';
import { atom } from 'recoil';

export type BottomSheetType<T = unknown> = {
  id: string;
  title: string;
  children: ComponentType<{ sheetId: string }>;
  props?: T;
  isOpened: boolean;
  onClose?: () => void;
  onSelect?: (value?: unknown) => void;
};

export type BottomSheetProps = {
  board: Board;
};

export const SheetStore = atom<BottomSheetType>({
  key: 'sheet',
  default: {} as BottomSheetType,
});
