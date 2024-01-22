/** Style */
import styles from './DiaryImageList.module.scss';

/** Asset */
import { diaryImages } from '@Assets/DiaryImages';

/** Util */
import cn from 'classnames';

type DiaryImageListProp = {
  selectedId: number;
  onSelect: (id: number) => void;
};

export const DiaryImageList = ({ selectedId, onSelect }: DiaryImageListProp) => {
  const diaryImagesElement = diaryImages.map((diaryImage, index) => (
    <li
      key={`diary-image-${index}`}
      style={{ backgroundImage: `url('${diaryImage}')` }}
      className={cn(styles.diaryImage, { [styles.selected]: index === selectedId })}
      onClick={() => onSelect(index)}
    />
  ));

  return <ul className={styles.diaryImageList}>{diaryImagesElement}</ul>;
};
