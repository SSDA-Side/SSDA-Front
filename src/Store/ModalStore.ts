import { BoardFormData } from '@Type/Request';
import { ComponentType } from 'react';
import { atom } from 'recoil';

export type ComponentPayload<T = unknown> = {
  title: string;
  children: ComponentType<{ modalId: string }>;
  props?: T;
  isSubmitting?: boolean;
  onClose?: (value?: unknown) => void;
};

export type AlertPayload = {
  contents: string;
  onYes?: () => void;
};

export type ConfirmPayload = {
  contents: string;
  isReversedOrder?: boolean;
  onYes?: () => void;
  onNo?: () => void;
};

export type ModalType = 'Component' | 'Alert' | 'Confirm';

export type ModalPayloadType = ComponentPayload | AlertPayload | ConfirmPayload;

export type ComponentPayloadProps = BoardProps | ViewMemberProps | CreateShareLinkModalProps;

export type BoardProps = {
  defaultBoard: BoardFormData;
};

export type ViewMemberProps = {
  boardId: number;
};

export type CreateShareLinkModalProps = {
  boardId: number;
};

export type Modal<T extends ModalPayloadType = ModalPayloadType> = {
  id: string;
  type: ModalType;
  payload: T;
  isOpened: boolean;
};

export const ModalStore = atom<Modal[]>({
  key: 'modal',
  default: [],
});
