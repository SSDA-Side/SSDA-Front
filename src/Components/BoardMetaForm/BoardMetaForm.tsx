/** React */
import { useState } from 'react';

/** Style 및 Layout */
import styles from './BoardMetaForm.module.scss';

/** Component */
import { AppearanceRadio } from '@Components/AppearanceRadio';
import { BoardPresenter } from '@Components/BoardPresenter';
import { CTAButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';
import { DiaryImageList } from '@Components/DiaryImageList';

/** Type */
import type { BoardFormData } from '@Type/Request';

/** Util */
import cn from 'classnames';

/** Const */
const initialBoardForm: BoardFormData = {
  title: '',
  imageNumber: 0,
  appearanceType: 0,
};

type BoardMetaFormProp = {
  isDisabled?: boolean;
  defaultBoard?: BoardFormData;
  onSubmit?: (formData: BoardFormData) => void;
};

export const BoardMetaForm = ({ isDisabled = false, defaultBoard, onSubmit }: BoardMetaFormProp) => {
  const [formData, setFormData] = useState<BoardFormData>(defaultBoard || initialBoardForm);

  const { title, imageNumber, appearanceType } = formData;

  const CTAText = defaultBoard ? '수정하기' : '만들기';

  const updateField = (fields: Partial<BoardFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...fields }));
  };

  const handleSubmit = (formData: BoardFormData) => {
    onSubmit && onSubmit(formData);
  };

  return (
    <fieldset className={styles.disabledControll} disabled={isDisabled}>
      <div className={styles.formContaienr}>
        <div className={styles.group}>
          <div className={styles.inputBox}>
            <input
              placeholder="일기장 제목을 입력해주세요"
              defaultValue={title}
              onChange={(e) => updateField({ title: e.target.value })}
              maxLength={10}
            />
            <span>{title.length}/10</span>
          </div>
        </div>

        <div className={styles.group}>
          <Typography as="body2">디자인을 선택해주세요</Typography>
          <DiaryImageList selectedId={imageNumber} onSelect={(imageNumber) => updateField({ imageNumber })} />
        </div>

        <div className={styles.group}>
          <Typography as="body2">표지 스타일을 선택해주세요</Typography>

          <AppearanceRadio
            defaultValue={appearanceType}
            onValueChange={(appearanceType) => updateField({ appearanceType })}
          >
            <AppearanceRadio.Item value="simple" id={0} />
            <AppearanceRadio.Item value="detail" id={1} />
          </AppearanceRadio>
        </div>

        <div className={cn(styles.group, styles.boardPreviewWdith)}>
          <Typography as="body2">미리보기</Typography>
          <BoardPresenter {...formData} />
        </div>

        <CTAButton onClick={() => handleSubmit(formData)} disabled={formData.title.length === 0}>
          {/* TODO: 제출 시 스피너로 교체 */}
          {isDisabled ? '제출중...' : CTAText}
        </CTAButton>
      </div>
    </fieldset>
  );
};
