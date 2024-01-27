/** React */
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/** Styles 및 Layout */
import styles from './DiaryWritePage.module.scss';
import { PageLayout } from '@Layouts/PageLayout';

/** Component */
import { EmotionImage } from '@Assets/EmotionImages';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { BottomSheet } from './BottomSheet';

/** Hook */
import { useConfirm } from '@Hooks/useConfirm';
import { useCreateDiary } from '@Hooks/NetworkHooks';
import { useBottomSheet } from './BottomSheet/useBottomSheet';

/** Context */
import { FormDataContextProvider, useFormData, useFormDataState } from './FormDataContext';

/** Type */
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

export const DiaryWritePage = () => {
  return (
    <>
      <FormDataContextProvider>
        <WriteForm />
      </FormDataContextProvider>

      <BottomSheet />
    </>
  );
};

const WriteForm = () => {
  const [location, urlParams] = [useLocation(), useParams()];

  const { mutate, isPending } = useCreateDiary();

  const submitData = useFormDataState();
  const { updateBoardId, updateDiaryDate, updateEmotionId } = useFormData();

  const { openBottomSheet } = useBottomSheet();

  useEffect(() => {
    // 경로 체크
    const { boardId: savedBoardId } = submitData;
    const { boardId: currentBoardId } = urlParams;

    if (currentBoardId === undefined) {
      throw new Error('never but for boardId type-guard');
    }

    if (currentBoardId === savedBoardId) {
      return;
    }

    updateBoardId(currentBoardId);

    /**
     * 실제로 존재하는 일기장인지 체크가 필요할까?
     * -> MY 일기장에서 바로 넘어온 녀석이면 할 필요 없음
     * -> URL를 직접 조작해서 다른 일기장에 쓸 수도 있나? ㅋㅋ
     * -> 이건 서버측에서 처리해주는 걸로. TODO: 백엔드에 작성 권한 확인 요청하기
     */

    // 작성 날짜 체크
    const searchParams = new URLSearchParams(location.search);
    const diaryDate = searchParams.get('date') || getTodayDateString();

    updateDiaryDate(diaryDate);

    // 기분 선택
    openBottomSheet({ onSelect: updateEmotionId });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Validation
    const { diaryTitle, contents } = submitData;

    const isEmptyTitle = diaryTitle === '';
    const isEmptyContent = contents === '';

    if (isEmptyTitle) {
      return alert('일기 제목을 입력해주세요!');
    }

    if (isEmptyContent) {
      return alert('일기 내용을 입력해주세요!');
    }

    // TODO: API 연결 -> 서버쪽 로그인이 다 되고 나서 ... 시도하기
    mutate(submitData, {
      onSuccess() {
        alert('일기 작성 완료');
      },
    });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <fieldset className={styles.disabledController} disabled={isPending}>
        <PageLayout header={<Head />} body={<Body />} footer={<Foot />} />
      </fieldset>
    </form>
  );
};

// type HeadProp = { onBackClick: () => void };
const Head = () => {
  const navigate = useNavigate();

  const formData = useFormDataState();
  const { boardId, diaryTitle, contents, diaryImgs } = formData;

  const { showConfirm } = useConfirm();

  const handleBackClick = () => {
    const hasTitle = diaryTitle !== '';
    const hasContent = contents !== '';
    const haveSomeImages = diaryImgs !== null;
    const haveUnsavedChanges = hasTitle || hasContent || haveSomeImages;

    if (!haveUnsavedChanges) {
      return navigate(`/myboard/${boardId}`, { replace: true });
    }

    handleUnsavedChanges();
  };

  const handleUnsavedChanges = () => {
    const handleYes = () => navigate(`/myboard/${boardId}`, { replace: true });
    const handleNo = () => console.log('No Clicked');

    showConfirm('작성 중인 내용을\n저장하지 않고 나가시겠습니까?', {
      onYes: handleYes,
      onNo: handleNo,
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
        <IconButton type="submit" icon="check" />
      </PageHeader.Right>
    </PageHeader>
  );
};

// TODO: 어진님 공통 컴포넌트로 교체하기
const Body = () => {
  const { diaryImgs: selectedFiles, stickerId } = useFormDataState();
  const { updateContents, updateEmotionId, updateTitle } = useFormData();

  const { openBottomSheet } = useBottomSheet();

  const imageElements = useMemo(
    () => (selectedFiles ? createPreviewImageElements(selectedFiles) : null),
    [selectedFiles],
  );

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

  return (
    <main className={styles.container}>
      <section className={styles.emotionSection}>
        <button type="button" onClick={() => openBottomSheet({ onSelect: updateEmotionId })}>
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

        <div className={styles.imageList}>{imageElements}</div>
      </section>
    </main>
  );
};

const Foot = () => {
  const { diaryDate } = useFormDataState();
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
    const isOverMaxCount = selectedFiles.length > maxImageCount;

    if (isOverMaxCount) {
      return alert('최대 3개의 이미지만 선택할 수 있어요😭');
    }

    updateImages(selectedFiles);
  };

  return (
    <section className={styles.footer}>
      <PageHeader>
        <PageHeader.Left>
          <Typography as="body1">{diaryDate}</Typography>
        </PageHeader.Left>

        <PageHeader.Right>
          <IconButton type="button" icon="image" className={styles.primary} onClick={() => fileRef.current?.click()} />
          <IconButton type="button" icon="sunny" className={styles.greyed} />
          <IconButton type="button" icon="clock" className={styles.greyed} />
        </PageHeader.Right>
      </PageHeader>

      <input ref={fileRef} {...inputFileProps} onChange={handleFileChange} />
    </section>
  );
};

type PreviewImageProp = { file: File };
const PreviewImage = ({ file }: PreviewImageProp) => {
  return (
    <div
      className={styles.imagePlaceholder}
      style={{
        backgroundImage: `url('${URL.createObjectURL(file)}')`,
      }}
    />
  );
};

const createPreviewImageElements = (selectedFiles: FileList) =>
  Array.from(selectedFiles).map((file, index) => <PreviewImage key={index} file={file} />);

const getTodayDateString = () =>
  new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());
