import { BoardMetaForm } from '@Components/BoardMetaForm';
import { useCreateBoard } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { BoardFormData } from '@Type/Request';

export const AddBoardModal = ({ modalId }: { modalId: string }) => {
  const { mutate, isPending } = useCreateBoard();
  const { openAlert, closeModal, updateSubmitting } = useModal();

  const handleSubmit = (formData: BoardFormData) => {
    updateSubmitting({ modalId, isSubmitting: true });

    mutate(formData, {
      onSuccess() {
        openAlert({ contents: '일기창 추가 완료~' });
        closeModal(modalId);
      },
    });
  };

  return <BoardMetaForm onSubmit={handleSubmit} isDisabled={isPending} />;
};
