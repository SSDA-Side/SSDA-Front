/** React */
import { useState } from 'react';

/** Style */
import styles from './BoardItem.module.scss';

/** Component */
import { BoardFieldModal } from '@Components/BoardFieldModal';
import { BoardPresenter } from '@Components/BoardPresenter/BoardPresenter';
import { EditButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';
import { ContextMenuModal } from '@Components/ContextMenuModal';
import { MemberViewModal } from '@Components/MemberViewModal';

/** Component (TEST) */
import { TestModal } from '@Pages/MyBoardPage/TestModal';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Hook */
import { useCreateBoard, useDeleteBoard, useUpdateBoard } from '@Hooks/NetworkHooks';

/** Type */
import type { Board } from '@Type/Model';
import type { BoardFormData, UpdateBoardRequest } from '@Type/Request';

type BoardItmeProp = Board;
export const BoardItem = (boardProps: BoardItmeProp) => {
  const { mutate: updateBoard, isPending: isUpdateBoardPending } = useUpdateBoard();
  const { mutate: deleteBoard, isPending: isDeleteBoardPending } = useDeleteBoard();

  const isPending = isUpdateBoardPending || isDeleteBoardPending;

  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [isMemberOpened, setIsMemberOpened] = useState(false);

  const openContextMenu = () => setIsContextMenuOpened(true);
  const closeContextMenu = () => setIsContextMenuOpened(false);

  const openEditModal = () => setIsEditOpened(true);
  const closeEditModal = () => setIsEditOpened(false);

  const openMemberModal = () => setIsMemberOpened(true);
  const closeMemberModal = () => setIsMemberOpened(false);

  const handleBoardClick = () => {
    // TODO: Navigate to board detail page
  };

  // TODO: 전역 상태 Reducer로 옮겨야 함.
  const handleSelect = (type: string) => {
    const DELETE_TEXT = `일기장을 삭제하면, 일기장에 작성된 글도 모두 삭제되며, 복구할 수 없습니다.\n'${boardProps.title}' 일기장을 정말 삭제하시겠습니까?`;
    const COULD_NOT_DELETE_TEXT =
      '멤버가 모두 나간 후 가장 마지막에 남은 1명만 일기장을 삭제할 수 있어요.\n‘일기장 나가기’는 MY일기장 > 일기장 상세 > 우측상단 ‘멤버보기’에서 가능합니다.';
    const RESIGN_TEXT = `일기장을 나가면, 더 이상 이 일기장을 볼 수 없어요.\n정말 '${boardProps.title}' 일기장을 나가실건가요?`;

    // TODO: TYPE ENUM 작성, ex. CONTEXT_MENU.EDIT
    switch (type) {
      case 'edit': {
        closeContextMenu();
        openEditModal();
        break;
      }

      case 'trash': {
        // TODO: 처음 만들면 memberCount는 1이어야 하지 않나!?
        const isOnlyOneMember = boardProps.memberCount === 0;
        const couleDeleteBoard = isOnlyOneMember;

        if (couleDeleteBoard) {
          // TODO: Custom Dialog로 바꾸기
          const wouldDelete = confirm(DELETE_TEXT);

          deleteBoard(
            { id: boardProps.id },
            {
              onSuccess() {
                closeContextMenu();
              },
            },
          );
          return console.log({ wouldDelete });
        }

        // TODO: Custom Dialog로 바꾸기
        alert(COULD_NOT_DELETE_TEXT);
        closeContextMenu();

        break;
      }

      case 'exit': {
        // TODO: Custom Dialog로 바꾸기
        const wouldResign = confirm(RESIGN_TEXT);

        if (wouldResign) {
          // TODO: 일기장 탈퇴 로직 시작
          alert('사실 아직 미구현임ㅋㅋ');
        }

        closeContextMenu();
        break;
      }

      case 'users': {
        closeContextMenu();
        openMemberModal();
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleSubmit = (formData: BoardFormData) => {
    const submitData = {
      ...formData,
      id: boardProps.id,
    } as UpdateBoardRequest;

    updateBoard(submitData, {
      onSuccess() {
        closeEditModal();
      },
    });
  };

  return (
    <>
      <div role="button" className={styles.itemContainer} tabIndex={0} onClick={handleBoardClick}>
        <div className={styles.presenterContainer}>
          <BoardPresenter {...boardProps} />

          <div className={styles.editButtonWrapper}>
            <EditButton onClick={openContextMenu} />
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <Typography as="body3">글 {boardProps.diaryCount}개</Typography>
          <Typography as="body3">인원 {boardProps.memberCount}명</Typography>
        </div>
      </div>

      <TestModal open={isContextMenuOpened} onClose={closeContextMenu}>
        <TestModal.Overlay />
        <TestModal.Content type="contextMenu">
          <ContextMenuModal title={boardProps.title} onClose={closeContextMenu} onSelect={handleSelect} />
        </TestModal.Content>
      </TestModal>

      <TestModal open={isEditOpened} onClose={closeEditModal}>
        <TestModal.Overlay />
        <TestModal.Content>
          <BoardFieldModal
            title="일기장 편집"
            disabled={isPending}
            defaultBoard={boardProps}
            onClose={closeEditModal}
            onSubmit={handleSubmit}
          />
        </TestModal.Content>
      </TestModal>

      <TestModal open={isMemberOpened} onClose={closeMemberModal}>
        <TestModal.Overlay />
        <TestModal.Content>
          <MemberViewModal {...boardProps} onClose={closeMemberModal} />
        </TestModal.Content>
      </TestModal>
    </>
  );
};

export const AddBoardItemButton = () => {
  const { mutate, isPending } = useCreateBoard();

  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const openAddModal = () => setIsAddModalOpened(true);
  const closeAddModal = () => setIsAddModalOpened(false);

  const handleSubmit = (formData: BoardFormData) => {
    mutate(formData, {
      onSuccess() {
        alert('일기창 추가 완료~');
        closeAddModal();
      },
    });
  };

  return (
    <>
      <div role="button" className={styles.itemContainer} tabIndex={0} onClick={openAddModal}>
        <div className={styles.imageContainer}>
          <div className={styles.itemAdd}>
            {/* TODO: 추가 아이콘으로 바꾸기 */}
            <div style={{ rotate: '45deg' }}>
              <SVGIcon name="close" />
            </div>

            <div className={styles.itemAddDescription}>
              <Typography as="diary-add-description">{`새로운 일기장을\n만들어보세요!`}</Typography>
            </div>
          </div>
        </div>
      </div>

      <TestModal open={isAddModalOpened} onClose={closeAddModal}>
        <TestModal.Overlay />
        <TestModal.Content>
          <BoardFieldModal title="일기장 추가" disabled={isPending} onClose={closeAddModal} onSubmit={handleSubmit} />
        </TestModal.Content>
      </TestModal>
    </>
  );
};
