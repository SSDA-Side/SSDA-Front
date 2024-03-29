import { BoardContextMenu } from '@Components/BoardContextMenu/BoardContextMenu';
import { ModifyBoardModal } from '@Components/Modals/ModifyBoardModal';
import { ViewMemberModal } from '@Components/Modals/ViewMemberModal';
import { useDeleteBoard, useResignBoard } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { useSheet } from '@Hooks/useSheet';
import { BoardProps } from '@Store/ModalStore';
import { BottomSheetProps, BottomSheetType } from '@Store/SheetShore';

// export const EditBoardSheet = ({ sheetId }: { sheetId: string }) => {
export const EditBoardSheet = () => {
  const { mutate: resignBoard } = useResignBoard();
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
    const isOnlyOneMember = boardProps.memberCount === 1;
    const couleDeleteBoard = isOnlyOneMember;

    if (couleDeleteBoard) {
      openConfirm({
        contents: DELETE_TEXT,
        onYes() {
          deleteBoard({ id: boardProps.id }, { onSuccess: closeBottomSheet });
        },
      });
    } else {
      openAlert({
        contents: COULD_NOT_DELETE_TEXT,
        onYes: closeBottomSheet,
      });
    }
  };

  const handleResign = () => {
    openConfirm({
      contents: RESIGN_TEXT,
      onYes() {
        resignBoard(
          { id: boardProps.id },
          {
            onSuccess: closeBottomSheet,
            onError: () => openAlert({ contents: '서버에서 오류가 났습니다.\n다시 시도해주세요.' }),
          },
        );
      },
    });
  };

  const handleViewMember = () => {
    closeBottomSheet();
    openComponentModal({
      title: '멤버 보기',
      children: ViewMemberModal,
      props: {
        board: boardProps,
      },
    });
  };

  const handleSelect = (type: string) => {
    const typpedEventMap: { [k in string]: () => void } = {
      edit: handleEdit,
      trash: handleDelete,
      exit: handleResign,
      users: handleViewMember,
    };

    const typpedEvent = typpedEventMap[type];

    typpedEvent();
  };

  return <BoardContextMenu onSelect={handleSelect} />;
};
