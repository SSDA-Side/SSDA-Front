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
        openAlert({ contents: '일기장을 추가하였습니다.' });
        closeModal(modalId);
      },
    });
  };

  return <BoardMetaForm onSubmit={handleSubmit} isDisabled={isPending} />;
};
