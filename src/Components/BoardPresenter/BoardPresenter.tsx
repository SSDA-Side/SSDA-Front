/** Style */
import styles from './BoardPresneter.module.scss';

/** Asset */
import { diaryImages } from '@Assets/DiaryImages';

/** Type */
import { Board } from '@Type/Model';

type BoardPresenterProp = Partial<Board>;
export const BoardPresenter = (boardProps: BoardPresenterProp) => {
  const SIMPLE_TYPE = 0;
  const DETAIL_TYPE = 1;

  const { appearanceType } = boardProps;

  const isSimpleType = appearanceType === SIMPLE_TYPE;
  const isDetailType = appearanceType === DETAIL_TYPE;

  return (
    <>
      {isSimpleType && <SimpleBoardPresenter {...boardProps} />}
      {isDetailType && <DetailBoardPresenter {...boardProps} />}
    </>
  );
};

type DetailBoardPresenterProp = Partial<Board>;
const DetailBoardPresenter = ({ imageNumber, title, regDate }: DetailBoardPresenterProp) => {
  const sinceLabel = new Date(regDate || new Date()).toLocaleDateString();

  return (
    <div
      className={styles.boardPreview}
      style={{
        backgroundImage: `url('${diaryImages[imageNumber!]}')`,
      }}
    >
      <div className={styles.boardDetailBoxLayout}>
        <div className={styles.boardDetailBox}>
          <h6>{title}</h6>
          <div className={styles.delimiter} />

          <div className={styles.boxBottom}>
            <p>{sinceLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type SimpleBoardPresenterProp = Partial<Board>;
const SimpleBoardPresenter = ({ imageNumber, title }: SimpleBoardPresenterProp) => {
  return (
    <div
      className={styles.boardPreview}
      style={{
        backgroundImage: `url('${diaryImages[imageNumber!]}')`,
      }}
    >
      <div className={styles.boardSimpleBox}>
        <h6>{title}</h6>
      </div>
    </div>
  );
};
