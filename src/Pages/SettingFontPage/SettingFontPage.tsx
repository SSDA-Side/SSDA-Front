import { useEffect, useState } from 'react';
import styles from './SettingFontPage.module.scss';
import cn from 'classnames';
import { TextArea } from '@Components/Common/TextArea';
import { CTAButton } from '@Components/Common/Button';
import { useGetUser, useUpdateFont } from '@Hooks/NetworkHooks';

const fontList = ['프리텐다드', '나눔 스퀘어', '제주 명조', '미니 손글씨'];

export const SettingFontPage = () => {
  // TODO: [feat] 전역이 아니라 서버에 저장되도록 수정

  // const setFont = useSetRecoilState(fontStateStore);
  // const fontData = useRecoilState(fontStateStore);
  const { data: userData, isSuccess } = useGetUser();
  const [selectedFont, setSelectedFont] = useState<string>('');
  const { mutate: updateFontMutation } = useUpdateFont(fontList.indexOf(selectedFont) + 1, userData?.id as number);

  useEffect(() => {
    console.log('userData', userData);
    if (isSuccess) {
      setSelectedFont(fontList[userData?.font - 1]);
    }
  }, [isSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFont(event.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.fontContainer}>
        <div className={styles.radioContent}>
          {fontList.map((font) => (
            <label
              key={font}
              className={cn(styles.radioList, {
                [styles.Pretendard]: font === '프리텐다드',
                [styles.NanumSquare]: font === '나눔 스퀘어',
                [styles.Jeju]: font === '제주 명조',
                [styles.mini]: font === '미니 손글씨',
              })}
            >
              {font}
              <input type="radio" name="font" value={font} checked={selectedFont === font} onChange={handleChange} />
            </label>
          ))}
        </div>
        <div className={styles.previewContent}>
          <p>미리보기</p>
          <TextArea
            className={cn(styles.radioList, {
              [styles.Pretendard]: selectedFont === '프리텐다드',
              [styles.NanumSquare]: selectedFont === '나눔 스퀘어',
              [styles.Jeju]: selectedFont === '제주 명조',
              [styles.mini]: selectedFont === '미니 손글씨',
            })}
            placeholder="DASSDA로 소중한 사람과 함께 일상을 공유해보세요!"
            readOnly
          ></TextArea>
        </div>
      </div>
      <div className={styles.buttonBox}>
        <CTAButton
          onClick={() => {
            updateFontMutation();
          }}
        >
          저장
        </CTAButton>
      </div>
    </div>
  );
};
