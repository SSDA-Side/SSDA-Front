/** React */
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/** Styles 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './DiaryWritePage.module.scss';

/** Component */
import { EmotionImage } from '@Assets/EmotionImages';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Hook */
import { useCreateDiary } from '@Hooks/NetworkHooks';

/** Context */
import { FormDataContextProvider, useFormData, useFormDataState } from './FormDataContext';

/** Type */
import { EmotionSelect } from '@Components/EmotionSelect';
import { SelectEmotionSheet } from '@Components/Sheets/SelectEmotionSheet/SelectEmotionSheet';
import { useModal } from '@Hooks/useModal';
import { useSheet } from '@Hooks/useSheet';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

import cn from 'classnames';

export const DiaryWritePage = () => {
  return (
    <>
      <FormDataContextProvider>
        <WriteForm />
      </FormDataContextProvider>
    </>
  );
};

const WriteForm = () => {
  const [location, urlParams] = [useLocation(), useParams()];
  const { mutate, isPending } = useCreateDiary();

  const [isFirstStep, setIsFirstStep] = useState(true);

  const submitData = useFormDataState();
  const { updateBoardId, updateDiaryDate } = useFormData();

  const { openAlert } = useModal();

  useLayoutEffect(() => {
    const { boardId: savedBoardId } = submitData;
    const { boardId: currentBoardId } = urlParams;

    if (currentBoardId === undefined) {
      throw new Error('never but for boardId type-guard');
    }

    if (currentBoardId === savedBoardId) {
      return;
    }

    updateBoardId(currentBoardId);

    const searchParams = new URLSearchParams(location.search);
    const diaryDate = searchParams.get('date') || getTodayDateString();

    updateDiaryDate(diaryDate);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(submitData, {
      onSuccess() {
        openAlert({ contents: '일기 작성 완료' });
      },
    });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <fieldset className={styles.disabledController} disabled={isPending}>
        <PageLayout
          header={<Head disabled={isFirstStep} />}
          body={<Body firstStep={isFirstStep} onFirstStepCom={() => setIsFirstStep(false)} />}
          footer={<Foot dateHidden={isFirstStep} />}
        />
      </fieldset>
    </form>
  );
};

const Head = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();

  const formData = useFormDataState();
  const { boardId, diaryTitle, contents, diaryImgs } = formData;

  const isEmptyTitle = diaryTitle.trim() === '';
  const isEmptyContent = contents.trim() === '';

  const isDisabled = disabled || isEmptyTitle || isEmptyContent;

  const { openConfirm } = useModal();

  const handleBackClick = () => {
    const hasTitle = diaryTitle.trim() !== '';
    const hasContent = contents.trim() !== '';
    const haveSomeImages = diaryImgs !== null;
    const haveUnsavedChanges = hasTitle || hasContent || haveSomeImages;

    if (!haveUnsavedChanges) {
      return navigate(`/myboard/${boardId}`, { replace: true });
    }

    handleUnsavedChanges();
  };

  const handleUnsavedChanges = () => {
    const handleYes = () => navigate(`/myboard/${boardId}`, { replace: true });

    openConfirm({
      contents: '작성 중인 내용을\n저장하지 않고 나가시겠습니까?',
      onYes: handleYes,
    });
  };

  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton type="button" icon="left" onClick={handleBackClick} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h3">일기 작성</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton type="submit" icon="check" disabled={isDisabled} />
      </PageHeader.Right>
    </PageHeader>
  );
};

const Body = ({ firstStep, onFirstStepCom }) => {
  const { diaryImgs: selectedFiles, stickerId, diaryDate } = useFormDataState();
  const { updateContents, updateEmotionId, updateTitle, deleteImage } = useFormData();

  const { openBottomSheet } = useSheet();

  const showAddImageButton = (selectedFiles?.length || 0) !== 0 && (selectedFiles?.length || 0) < 3;

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnterKey = e.key === 'Enter';
    const hasSomeText = (e.target as HTMLInputElement).value !== '';
    const couldNextFocus = isEnterKey && hasSomeText;

    if (isEnterKey) {
      e.preventDefault();
    }

    if (couldNextFocus) {
      document.querySelector('textarea')!.focus();
    }
  };

  const handleEmotionClick = () => {
    openBottomSheet({
      title: diaryDate,
      children: SelectEmotionSheet,
      onSelect(emotionId) {
        updateEmotionId(emotionId as string);
      },
    });
  };

  if (firstStep) {
    return <SelectEmotionStep onSelect={() => onFirstStepCom(false)} />;
  }

  return (
    <main className={styles.container}>
      <section className={styles.emotionSection}>
        <button type="button" onClick={handleEmotionClick}>
          <EmotionImage index={Number(stickerId)} />
        </button>
      </section>

      <section className={styles.writeContainer}>
        <div>
          <input
            className={styles.diaryTitleBox}
            placeholder="일기장 제목을 입력해주세요"
            enterKeyHint="next"
            tabIndex={0}
            onKeyDown={handleTitleKeyDown}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>

        <div className={styles.writeWrapper}>
          <textarea
            className={styles.writeTextBox}
            id="diaryContent"
            name="diaryContent"
            placeholder="오늘 하루는 어떠셨나요?"
            maxLength={1000}
            tabIndex={0}
            onChange={(e) => updateContents(e.target.value)}
          />
        </div>

        <div className={styles.imageList}>
          {selectedFiles &&
            Array.from(selectedFiles).map((file, index) => (
              <PreviewImage key={index} file={file} onDelete={(file) => deleteImage(file)} />
            ))}
          {showAddImageButton && <AddImageButton />}
        </div>
      </section>
    </main>
  );
};

const SelectEmotionStep = ({ onSelect }: { onSelect: () => void }) => {
  const { diaryDate } = useFormDataState();
  const { updateEmotionId } = useFormData();

  const handleEmotionSelect = (emotionId: string) => {
    updateEmotionId(emotionId);
    onSelect();
  };

  return (
    <main className={cn(styles.container, styles.center)}>
      <Typography as="body1">{diaryDate}</Typography>
      <Typography as="body2">오늘 하루는 어떠셨나요?</Typography>
      <EmotionSelect onSelect={handleEmotionSelect} />
    </main>
  );
};

const Foot = ({ dateHidden }: { dateHidden: boolean }) => {
  const { diaryDate, diaryImgs } = useFormDataState();
  const { updateImages } = useFormData();

  const fileRef = useRef<HTMLInputElement>(null);

  const inputFileProps = {
    type: 'file',
    id: 'images',
    name: 'images',
    accept: 'image/*',
    multiple: true,
    hidden: true,
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target;

    if (!selectedFiles) {
      throw new Error('never but for selectedFiles type-guard');
    }

    const maxImageCount = 3;
    const isSelectdImgCountOverMax = selectedFiles.length > maxImageCount;
    const isAllAddedImgCountOverMax = selectedFiles.length + (diaryImgs?.length || 0) > maxImageCount;

    const isOverflow = isSelectdImgCountOverMax || isAllAddedImgCountOverMax;

    if (isOverflow) {
      return alert('최대 3개의 이미지만 선택할 수 있어요😭');
    }

    updateImages(selectedFiles);
  };

  return (
    <section className={styles.footer}>
      <PageHeader>
        <PageHeader.Left>{!dateHidden && <Typography as="body1">{diaryDate}</Typography>}</PageHeader.Left>

        <PageHeader.Right>
          <fieldset className={styles.addOnWrapper} disabled={dateHidden}>
            <IconButton
              type="button"
              icon="image"
              className={styles.primary}
              onClick={() => fileRef.current?.click()}
            />
            <IconButton type="button" icon="clock" className={styles.greyed} />
          </fieldset>
        </PageHeader.Right>
      </PageHeader>

      <input ref={fileRef} {...inputFileProps} onChange={handleFileChange} />
    </section>
  );
};

const AddImageButton = () => {
  return (
    <div
      className={styles.imagePlaceholder}
      onClick={() => (document.querySelector('#images') as HTMLInputElement).click()}
    >
      <div className={styles.rotated}>
        <SVGIcon name="close" />
      </div>
    </div>
  );
};

type PreviewImageProp = { file: File; onDelete: (targetFile: File) => void };
const PreviewImage = ({ file, onDelete }: PreviewImageProp) => {
  return (
    <div
      className={styles.imagePlaceholder}
      style={{
        backgroundImage: `url('${URL.createObjectURL(file)}')`,
      }}
    >
      <button className={styles.deleteMark} type="button" onClick={() => onDelete(file)}>
        <SVGIcon name="close" size={24} />
      </button>
    </div>
  );
};

const getTodayDateString = () =>
  new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());
