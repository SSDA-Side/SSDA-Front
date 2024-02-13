import { BoardContextMenu } from '@Components/BoardContextMenu/BoardContextMenu';
import { ModifyBoardModal } from '@Components/Modals/ModifyBoardModal';
import { ViewMemberModal } from '@Components/Modals/ViewMemberModal';
import { useDeleteBoard } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { useSheet } from '@Hooks/useSheet';
import { BoardProps } from '@Store/ModalStore';
import { BottomSheetProps, BottomSheetType } from '@Store/SheetShore';

export const EditBoardSheet = ({ sheetId: string }) => {
  const { mutate: deleteBoard } = useDeleteBoard();

  const { openComponentModal, openConfirm, openAlert } = useModal();
  const { bottomSheet, closeBottomSheet } = useSheet();

  const { props } = bottomSheet as BottomSheetType<BottomSheetProps>;
  const { board: boardProps } = props!;

  const DELETE_TEXT = `일기장을 삭제하면, 일기장에 작성된 글도 모두 삭제되며, 복구할 수 없습니다.\n'${boardProps.title}' 일기장을 정말 삭제하시겠습니까?`;
  const COULD_NOT_DELETE_TEXT =
    '멤버가 모두 나간 후 가장 마지막에 남은 1명만 일기장을 삭제할 수 있어요.\n‘일기장 나가기’는 MY일기장 > 일기장 상세 > 우측상단 ‘멤버보기’에서 가능합니다.';
  const RESIGN_TEXT = `일기장을 나가면, 더 이상 이 일기장을 볼 수 없어요.\n정말 '${boardProps.title}' 일기장을 나가실건가요?`;

  const handleEdit = () => {
    closeBottomSheet();
    openComponentModal<BoardProps>({
      title: '일기장 편집',
      children: ModifyBoardModal,
      props: {
        defaultBoard: boardProps,
      },
    });
  };

  const handleDelete = () => {
    const isOnlyOneMember = boardProps.memberCount === 0;
    const couleDeleteBoard = isOnlyOneMember;

    if (couleDeleteBoard) {
      openConfirm({
        contents: DELETE_TEXT,
        onYes() {
          deleteBoard(
            { id: boardProps.id },
            {
              onSuccess() {
                closeBottomSheet();
              },
            },
          );
        },
      });
    } else {
      openAlert({
        contents: COULD_NOT_DELETE_TEXT,
        onYes() {
          closeBottomSheet();
        },
      });
    }
  };

  const handleResign = () => {
    openConfirm({
      contents: RESIGN_TEXT,
      onYes() {
        openAlert({ contents: '사실 아직 미구현임ㅋㅋ' });
        closeBottomSheet();
      },
    });
  };

  const handleViewMember = () => {
    closeBottomSheet();
    openComponentModal({
      title: '멤버 보기',
      children: ViewMemberModal,
      props: {
        boardId: boardProps.id,
      },
    });
  };

  const handleSelect = (type: string) => {
    switch (type) {
      case 'edit': {
        handleEdit();
        break;
      }

      case 'trash': {
        handleDelete();
        break;
      }

      case 'exit': {
        handleResign();
        break;
      }

      case 'users': {
        handleViewMember();
        break;
      }
    }
  };

  return <BoardContextMenu onSelect={handleSelect} />;
};
