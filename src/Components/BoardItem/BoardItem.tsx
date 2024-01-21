/** Style */
import styles from './BoardItem.module.scss';

/** Component */
import { EditButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Aseet */
import { diaryImages } from '@Assets/DiaryImages';

/** Type */
import type { Board } from '@Type/index';
import type { MouseEvent } from 'react';

type BoardItmeProp = Board;
export const BoardItem = (boardProps: BoardItmeProp) => {
  const handleBoardClick = () => {
    // TODO
  };

  const handleEditClick = () => {
    // TODO
  };

  return (
    <>
      <BoardPresenter {...boardProps} onBoardClick={handleBoardClick} onEditClick={handleEditClick} />
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
  const handleClick = () => {
    // TODO
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
