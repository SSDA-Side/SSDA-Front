import { BoardMetaForm } from '@Components/BoardMetaForm';
import { useUpdateBoard } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { BoardProps, ComponentPayload } from '@Store/ModalStore';
import { BoardFormData } from '@Type/Request';

export const ModifyBoardModal = ({ modalId }: { modalId: string }) => {
  const { mutate, isPending } = useUpdateBoard();
  const { getModal, openAlert, closeModal, updateSubmitting } = useModal();

  const { payload } = getModal(modalId);
  const { props: boardProps } = payload as ComponentPayload<BoardProps>;

  const { defaultBoard } = boardProps!;

  const handleSubmit = (formData: BoardFormData) => {
    updateSubmitting({ modalId, isSubmitting: true });

    mutate(formData, {
      onSuccess() {
        openAlert({ contents: '일기장 수정 완료~' });
        closeModal(modalId);
      },
    });
  };

  return <BoardMetaForm onSubmit={handleSubmit} isDisabled={isPending} defaultBoard={defaultBoard} />;
};
