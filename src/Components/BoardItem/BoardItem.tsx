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
  const [isEditOpened, setIsEditOpened] = useState(false);

  const openEditModal = () => setIsEditOpened(true);
  const closeEditModal = () => setIsEditOpened(false);

  const handleBoardClick = () => {
    // TODO
  };

  return (
    <>
      <BoardPresenter {...boardProps} onBoardClick={handleBoardClick} onEditClick={openEditModal} />

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
