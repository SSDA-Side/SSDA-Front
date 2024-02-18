import {
  AlertPayload,
  ComponentPayload,
  ComponentPayloadProps,
  ConfirmPayload,
  Modal,
  ModalPayloadType,
  ModalStore,
  ModalType,
} from '@Store/ModalStore';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { v4 as uuid } from 'uuid';

export const useModal = () => {
  const modals = useRecoilValue(ModalStore);

  const openModal = useRecoilCallback(
    ({ set }) =>
      ({ type, payload }: { type: ModalType; payload: ModalPayloadType }) => {
        const newId = uuid();

        set(ModalStore, (prevState) => {
          return [
            ...prevState,
            {
              id: newId,
              type,
              payload,
              isOpened: true,
            } as Modal,
          ];
        });

        return newId;
      },
    [],
  );

  const closeModal = useRecoilCallback(
    ({ set }) =>
      (modalId: string) => {
        set(ModalStore, (prevState) => {
          return [...prevState.filter(({ id }) => id !== modalId)];
        });
      },
    [],
  );

  const openComponentModal = <T extends ComponentPayloadProps>(payload: ComponentPayload<T>) => {
    return openModal({ type: 'Component', payload });
  };

  const openAlert = (payload: AlertPayload) => {
    return openModal({ type: 'Alert', payload });
  };

  const openConfirm = (payload: ConfirmPayload) => {
    return openModal({ type: 'Confirm', payload });
  };

  type UpdateSubmittingProp = { modalId: string; isSubmitting: boolean };
  const updateSubmitting = useRecoilCallback(
    ({ set }) =>
      <T extends ComponentPayloadProps>({ modalId, isSubmitting }: UpdateSubmittingProp) => {
        set(ModalStore, (prevState) =>
          prevState.map((modal) =>
            modal.id === modalId
              ? ({
                  ...modal,
                  payload: {
                    ...modal.payload,
                    isSubmitting,
                  },
                } as Modal<ComponentPayload<T>>)
              : modal,
          ),
        );
      },
    [],
  );

  const getModal = (modalId: string) => {
    const targetModal = modals.find(({ id }) => id === modalId);

    if (!targetModal) {
      throw new Error('never but for getModal type-guard');
    }

    return targetModal;
  };

  return {
    modals,
    getModal,
    openModal,
    closeModal,
    openComponentModal,
    openAlert,
    openConfirm,
    updateSubmitting,
  };
};
