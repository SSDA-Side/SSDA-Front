/** React */
import { useState } from 'react';

/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './BoardFieldModal.module.scss';

/** Component */
import { CTAButton, IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { AppearanceRadio } from '@Components/AppearanceRadio';
import { DiaryImageList } from '@Components/DiaryImageList';

/** Type */
import { Board } from '@Type/index';

/** Const */
const initialBoardForm = {
  id: -1,
  title: '',
  imageId: 0,
  appearanceId: 0,
} as BoardFormData;

type BoardFormData = Omit<Board, 'diaryCount' | 'peopleCount'>;

type BoardFieldModalProp = { title: string; defaultBoard?: BoardFormData; onClose: () => void };
export const BoardFieldModal = (props: BoardFieldModalProp) => {
  return <PageLayout header={<Head {...props} />} body={<Body {...props} />} />;
};

type HeadProp = { title: string; onClose: () => void };
const Head = ({ title, onClose }: HeadProp) => {
  return (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2">{title}</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={onClose} />
      </PageHeader.Right>
    </PageHeader>
  );
};

type BodyProp = { onClose: () => void; defaultBoard?: BoardFormData };
const Body = ({ onClose, defaultBoard }: BodyProp) => {
  const [formData, setFormData] = useState<BoardFormData>(defaultBoard || initialBoardForm);

  const { title, imageId, appearanceId } = formData;
  const CTAText = defaultBoard ? '수정하기' : '만들기';

  const updateField = (fields: Partial<BoardFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...fields }));
  };

  const handleSubmit = (formData: BoardFormData) => {
    // TODO: API 연결
    alert(new URLSearchParams(formData));
    onClose();
  };

  return (
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
        <DiaryImageList selectedId={imageId} onSelect={(imageId) => updateField({ imageId })} />
      </div>

      <div className={styles.group}>
        <Typography as="body2">표지 스타일을 선택해주세요</Typography>

        <AppearanceRadio defaultValue={appearanceId} onValueChange={(appearanceId) => updateField({ appearanceId })}>
          <AppearanceRadio.Item value="simple" id={0} />
          <AppearanceRadio.Item value="detail" id={1} />
        </AppearanceRadio>
      </div>

      <div className={styles.group}>
        <Typography as="body2">미리보기</Typography>
      </div>

      <CTAButton onClick={() => handleSubmit(formData)}>{CTAText}</CTAButton>
    </div>
  );
};
