/** React */
import { useState } from 'react';

/** Style */
import styles from './BoardItem.module.scss';

/** Component */
import { EditButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';

/** Component (TEST) */
import { TestModal } from '@Pages/MyBoardPage/TestModal';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Aseet */
import { diaryImages } from '@Assets/DiaryImages';

/** Type */
import type { Board } from '@Type/index';
import type { MouseEvent } from 'react';
import { BoardFieldModal } from '@Components/BoardFieldModal';

type BoardItmeProp = Board;
export const BoardItem = (boardProps: BoardItmeProp) => {
  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);

  const openContextMenu = () => setIsContextMenuOpened(true);
  const closeContextMenu = () => setIsContextMenuOpened(false);

  const openEditModal = () => setIsEditOpened(true);
  const closeEditModal = () => setIsEditOpened(false);

  const handleBoardClick = () => {
    // TODO
  };

  // TODO: 전역 상태 Reducer로 옮겨야 함.
  const handleSelect = (type: string) => {
    // TODO: TYPE ENUM 작성, ex. CONTEXT_MENU.EDIT
    switch (type) {
      case 'edit': {
        closeContextMenu();
        openEditModal();
        break;
      }

      case 'trash': {
        const isOnlyOneMember = boardProps.peopleCount === 1;
        const couleDeleteBoard = isOnlyOneMember;

        if (couleDeleteBoard) {
          // TODO: Custom Dialog로 바꾸기
          const wouldDelete = confirm(
            `일기장을 삭제하면, 일기장에 작성된 글도 모두 삭제되며, 복구할 수 없습니다.\n'${boardProps.title}' 일기장을 정말 삭제하시겠습니까?`,
          );

          // TODO: 삭제 로직 시작
          closeContextMenu();
          return console.log({ wouldDelete });
        }

        // TODO: Custom Dialog로 바꾸기
        alert(
          '멤버가 모두 나간 후 가장 마지막에 남은 1명만 일기장을 삭제할 수 있어요.\n‘일기장 나가기’는 MY일기장 > 일기장 상세 > 우측상단 ‘멤버보기’에서 가능합니다.',
        );
        closeContextMenu();

        break;
      }

      case 'exit': {
        // TODO: Custom Dialog로 바꾸기
        const wouldResign = confirm(
          `일기장을 나가면, 더 이상 이 일기장을 볼 수 없어요.\n정말 '${boardProps.title}' 일기장을 나가실건가요?`,
        );

        // TODO: 일기장 탈퇴 로직 시작
        closeContextMenu();
        console.log({ wouldResign });
        break;
      }

      case 'users': {
        closeContextMenu();
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <BoardPresenter {...boardProps} onBoardClick={handleBoardClick} onEditClick={openContextMenu} />

      <TestModal open={isContextMenuOpened} onClose={closeContextMenu}>
        <TestModal.Overlay />
        <TestModal.Content type="contextMenu">
          <ContextMenuModal title={boardProps.title} onClose={closeContextMenu} onSelect={handleSelect} />
        </TestModal.Content>
      </TestModal>

      <TestModal open={isEditOpened} onClose={closeEditModal}>
        <TestModal.Overlay />
        <TestModal.Content>
          <BoardFieldModal title="일기장 편집" defaultBoard={boardProps} onClose={closeEditModal} />
        </TestModal.Content>
      </TestModal>
    </>
  );
};

type BoardPresenterProp = { onBoardClick: () => void; onEditClick: () => void } & Board;
const BoardPresenter = ({ imageId, diaryCount, peopleCount, onBoardClick, onEditClick }: BoardPresenterProp) => {
  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEditClick();
  };

  /**
   * TODO: Type 별로 다르게 보여주기
   * 디자인 수정 예정인데, 아마 보여지는 값 자체가 달라질 것 같아서 추후 개발
   * */
  const diaryImageStyle = { backgroundImage: `url('${diaryImages[imageId - 1]}')` };

  return (
    <div role="button" className={styles.itemContainer} tabIndex={0} onClick={onBoardClick}>
      <div className={styles.imageContainer} style={diaryImageStyle}>
        <div className={styles.editButtonWrapper}>
          <EditButton onClick={handleEditClick} />
        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <Typography as="body3">글 {diaryCount}개</Typography>
        <Typography as="body3">인원 {peopleCount}명</Typography>
      </div>
    </div>
  );
};

export const AddBoardItemButton = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const openAddModal = () => setIsAddModalOpened(true);
  const closeAddModal = () => setIsAddModalOpened(false);

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
          <BoardFieldModal title="일기장 추가" onClose={closeAddModal} />
        </TestModal.Content>
      </TestModal>
    </>
  );
};
