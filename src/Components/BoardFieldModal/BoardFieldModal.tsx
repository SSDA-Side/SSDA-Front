/** React */
import { useState } from 'react';

/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './BoardFieldModal.module.scss';

/** Component */
import { AppearanceRadio } from '@Components/AppearanceRadio';
import { BoardPresenter } from '@Components/BoardPresenter';
import { CTAButton, IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { DiaryImageList } from '@Components/DiaryImageList';

/** Type */
import type { BoardFormData } from '@Type/Request';

/** Util */
import cn from 'classnames';

/** Const */
const initialBoardForm = {
  title: '',
  imageNumber: 0,
  appearanceType: 0,
} as BoardFormData;

type BoardFieldModalProp = {
  title: string;
  defaultBoard?: BoardFormData;
  disabled?: boolean;
  onClose: () => void;
  onSubmit?: (formData: BoardFormData) => void;
};

export const BoardFieldModal = (props: BoardFieldModalProp) => {
  return <PageLayout header={<Head {...props} />} body={<Body {...props} />} />;
};

type HeadProp = { disabled?: boolean; title: string; onClose: () => void };
const Head = ({ disabled = false, title, onClose }: HeadProp) => {
  return (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2">{title}</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={onClose} disabled={disabled} />
      </PageHeader.Right>
    </PageHeader>
  );
};

type BodyProp = { disabled?: boolean; defaultBoard?: BoardFormData; onSubmit?: (formData: BoardFormData) => void };
const Body = ({ disabled = false, defaultBoard, onSubmit }: BodyProp) => {
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
    <fieldset className={styles.disabledControll} disabled={disabled}>
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
          {disabled ? '제출중...' : CTAText}
        </CTAButton>
      </div>
    </fieldset>
  );
};
