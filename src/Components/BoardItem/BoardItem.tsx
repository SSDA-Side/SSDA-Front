/** React */

/** Style */
import styles from './BoardItem.module.scss';

/** Component */
import { BoardPresenter } from '@Components/BoardPresenter/BoardPresenter';
import { EditButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';

/** Component (TEST) */

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Hook */

/** Type */
import { AddBoardModal } from '@Components/Modals/AddBoardModal';
import { EditBoardSheet } from '@Components/Sheets/EditBoardSheet';
import { useModal } from '@Hooks/useModal';
import { useSheet } from '@Hooks/useSheet';
import { BottomSheetProps } from '@Store/SheetShore';
import type { Board } from '@Type/Model';

type BoardItmeProp = Board;
export const BoardItem = (boardProps: BoardItmeProp) => {
  const { openBottomSheet } = useSheet();

  const handleBoardClick = () => {
    // TODO: Navigate to board detail page
  };

  const handleEditClick = () => {
    openBottomSheet<BottomSheetProps>({
      title: boardProps.title,
      children: EditBoardSheet,
      props: {
        board: boardProps,
      },
    });
  };

  return (
    <>
      <div role="button" className={styles.itemContainer} tabIndex={0} onClick={handleBoardClick}>
        <div className={styles.presenterContainer}>
          <BoardPresenter {...boardProps} />

          <div className={styles.editButtonWrapper}>
            <EditButton onClick={handleEditClick} />
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <Typography as="body3">글 {boardProps.diaryCount}개</Typography>
          <Typography as="body3">인원 {boardProps.memberCount}명</Typography>
        </div>
      </div>
    </>
  );
};

export const AddBoardItemButton = () => {
  const { openComponentModal } = useModal();

  const handleClick = () => {
    openComponentModal({
      title: '일기장 추가',
      children: AddBoardModal,
    });
  };

  return (
    <>
      <div role="button" className={styles.itemContainer} tabIndex={0} onClick={handleClick}>
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
    </>
  );
};
