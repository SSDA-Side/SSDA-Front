import { EmotionImage } from '@Assets/EmotionImages';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { EmotionSelect } from '@Components/EmotionSelect';
import { SelectEmotionSheet } from '@Components/Sheets/SelectEmotionSheet';
import { useGetEmotionQuestion, useUpdateDiary } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { useSheet } from '@Hooks/useSheet';
import { SVGIcon } from '@Icons/SVGIcon';
import { ContentImage } from '@Type/Model';
import { DiaryFormData, UpdateDiaryRequest } from '@Type/Request';
import cn from 'classnames';
import { ChangeEvent, KeyboardEvent, useMemo, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './DiaryEditPage.module.scss';

type EditFormData = {
  id: number;
  boardId: number;
  memberId: number;
  emotionId: number;
  title: string;
  contents: string;
  selectedDate: string;
  images: File[];
  uploadedImages: ContentImage[];
};

export const DiaryEditPage = () => {
  const [location, urlParams] = [useLocation(), useParams()];
  const { boardId } = urlParams;

  if (location.state === null) {
    return <Navigate to="/myboard" />;
  }

  const { diary } = location.state;

  const newEditData: EditFormData = {
    ...diary,
    boardId: Number(boardId),
    emotionId: diary.emotionId + 1,
    images: [],
    uploadedImages: diary.images as ContentImage[],
  };

  return <AwaitedPage initialEditData={newEditData} />;
};

const AwaitedPage = ({ initialEditData }: { initialEditData: EditFormData }) => {
  const { boardId, selectedDate } = initialEditData;

  const { mutate: updateDiary } = useUpdateDiary();
  const { openConfirm, openAlert } = useModal();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialEditData);

  const shouldSelectEmotion = formData.emotionId === -1;
  const couldWriteDiary = formData.emotionId !== -1;
  const isSubmitDisabled = false;

  const updateFields = (fields: Partial<DiaryFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...fields }));
  };

  const handleBackClick = () => {
    const { title, contents, images } = formData;

    const hasTitle = title.trim() !== '';
    const hasContent = contents.trim() !== '';
    const haveSomeImages = images.length !== 0;
    const haveUnsavedChanges = hasTitle || hasContent || haveSomeImages;

    if (!haveUnsavedChanges) {
      return navigate(`/myboard/${boardId}/calendar`, { replace: true });
    }

    handleUnsavedChanges();
  };

  const handleUnsavedChanges = () => {
    openConfirm({
      contents: '수정 중인 내용을\n저장하지 않고 나가시겠습니까?',
      onYes: () => navigate(`/myboard/${boardId}/calendar`, { replace: true }),
    });
  };

  const handleSubmit = () => {
    const submitData: UpdateDiaryRequest = {
      ...formData,
      uploadedImageIds: formData.uploadedImages.map(({ id }) => id),
    };

    console.log({ submitData });

    updateDiary(submitData, {
      onSuccess() {
        navigate(`/myboard/${boardId}/detail?date=${selectedDate.split('T')[0]}&mId=${formData.memberId}`, {
          replace: true,
        });
      },
      onError() {
        openAlert({ contents: '일기 수정에 실패했습니다.\n다시 시도해주세요.' });
      },
    });
  };

  return (
    <div className={styles.formContainer}>
      <Header onBackClick={handleBackClick} isDisabled={isSubmitDisabled} onSubmit={handleSubmit} />
      {shouldSelectEmotion && <SelectEmotionView {...formData} onSelect={(emotionId) => updateFields({ emotionId })} />}
      {couldWriteDiary && <WriteForm {...formData} onFieldChange={updateFields} />}
    </div>
  );
};

const Header = ({
  onBackClick,
  isDisabled,
  onSubmit,
}: {
  onBackClick: () => void;
  isDisabled: boolean;
  onSubmit: () => void;
}) => {
  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton type="button" icon="left" onClick={onBackClick} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h3">일기 수정</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton type="submit" icon="check" disabled={isDisabled} onClick={onSubmit} />
      </PageHeader.Right>
    </PageHeader>
  );
};

const SelectEmotionView = ({ onSelect, selectedDate }: { onSelect: (emotionId: number) => void } & EditFormData) => {
  const { data } = useGetEmotionQuestion();

  return (
    <>
      <main className={cn(styles.container, styles.center)}>
        <Typography as="body1">
          {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(selectedDate))}
        </Typography>
        <Typography as="body2">{data?.emotionContent || '질문 불러오는 중...'}</Typography>
        <EmotionSelect onSelect={onSelect} />
      </main>

      <section className={styles.footer}>
        <PageHeader>
          <PageHeader.Right>
            <fieldset className={styles.addOnWrapper} disabled={true}>
              <IconButton type="button" icon="image" className={cn(styles.greyed)} />
              <IconButton type="button" icon="clock" className={styles.greyed} />
            </fieldset>
          </PageHeader.Right>
        </PageHeader>
      </section>
    </>
  );
};

const WriteForm = ({
  onFieldChange,
  ...formData
}: { onFieldChange: (fields: Partial<EditFormData>) => void } & EditFormData) => {
  const { title, images, contents, emotionId, selectedDate, uploadedImages } = formData;
  const { openBottomSheet } = useSheet();

  const handleEmotionClick = () => {
    openBottomSheet({
      title: new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(selectedDate)),
      children: SelectEmotionSheet,
      onSelect(emotionId) {
        onFieldChange({ emotionId: emotionId as number });
      },
    });
  };

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

  const handleDeleteImage = (targetImage: File | ContentImage) => {
    if (typeof targetImage === 'object') {
      onFieldChange({ uploadedImages: uploadedImages.filter(({ id }) => id !== (targetImage as ContentImage).id) });
    } else {
      onFieldChange({
        images: [...images.filter((file) => file.name !== (targetImage as File).name)],
      });
    }
  };

  return (
    <>
      <main className={styles.container}>
        <section className={styles.emotionSection}>
          <button type="button" onClick={handleEmotionClick}>
            <EmotionImage index={emotionId - 1} />
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
              value={title}
              onChange={(e) => onFieldChange({ title: e.target.value })}
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
              value={contents}
              onChange={(e) => onFieldChange({ contents: e.target.value })}
            />
          </div>

          <ImageList {...formData} onDelete={handleDeleteImage} />
        </section>
      </main>

      <Toolbar {...formData} onFieldChange={onFieldChange} />
    </>
  );
};

const ImageList = ({
  images,
  uploadedImages,
  onDelete,
}: { onDelete: (targetFile: File | ContentImage) => void } & EditFormData) => {
  const previewImages = [...(uploadedImages || []), ...images];

  console.log(previewImages);

  const hasImages = previewImages.length !== 0;
  const isNotMax = previewImages.length < 3;
  const showAddImageButton = hasImages && isNotMax;

  return (
    <div className={styles.imageList}>
      {hasImages && previewImages.map((image, index) => <PreviewImage key={index} image={image} onDelete={onDelete} />)}
      {showAddImageButton && <AddImageButton />}
    </div>
  );
};

type PreviewImageProp = { image: File | ContentImage; onDelete: (targetFile: File | ContentImage) => void };
const PreviewImage = ({ image, onDelete }: PreviewImageProp) => {
  const imageUrl = useMemo(() => (image instanceof File ? URL.createObjectURL(image) : image.imgUrl), [image]);

  return (
    <div
      className={styles.imagePlaceholder}
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <button className={styles.deleteMark} type="button" onClick={() => onDelete(image)}>
        <SVGIcon name="close" size={24} />
      </button>
    </div>
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

const Toolbar = ({
  selectedDate,
  images,
  uploadedImages,
  contents,
  onFieldChange,
}: {
  onFieldChange: (fields: Partial<EditFormData>) => void;
} & Partial<EditFormData>) => {
  const { openAlert } = useModal();

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
    const selectedFilesCount = selectedFiles.length;
    const localFilesCount = images?.length || 0;
    const uploadedImagesCount = uploadedImages?.length || 0;

    const isSelectdImgCountOverMax = selectedFilesCount > maxImageCount;
    const isAllAddedImgCountOverMax = selectedFilesCount + localFilesCount + uploadedImagesCount > maxImageCount;

    const isOverflow = isSelectdImgCountOverMax || isAllAddedImgCountOverMax;

    if (isOverflow) {
      return openAlert({ contents: '최대 3개의 이미지만 선택할 수 있어요😭' });
    }

    const imageFileNames = [...selectedFiles].map((imageFile) => imageFile.name);
    const hasAlready = !!images?.find((imageFile) => imageFileNames.includes(imageFile.name));

    if (hasAlready) {
      return openAlert({ contents: '같은 이미지를 선택하셨습니다.' });
    }

    console.log({ selectedFiles });

    onFieldChange({ images: [...(images || []), ...selectedFiles] });
    e.target.value = '';
  };

  return (
    <section className={styles.footer}>
      <PageHeader>
        <PageHeader.Left>
          <Typography as="body1">
            {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(selectedDate!))}
          </Typography>
        </PageHeader.Left>

        <PageHeader.Right>
          <IconButton
            type="button"
            icon="image"
            className={cn(styles.greyed, { [styles.primary]: images?.length !== 0 })}
            onClick={() => fileRef.current?.click()}
          />
          <IconButton
            type="button"
            icon="clock"
            className={styles.greyed}
            onClick={() => onFieldChange({ contents: [contents, getCurrentTimeString()].join(' ') })}
          />
        </PageHeader.Right>
      </PageHeader>

      <input ref={fileRef} {...inputFileProps} onChange={handleFileChange} />
    </section>
  );
};

const getCurrentTimeString = () => new Intl.DateTimeFormat('ko-KR', { timeStyle: 'short' }).format(Date.now());
