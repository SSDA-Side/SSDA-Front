import { ChangeEvent, useEffect, useState } from 'react';
import { CTAButton } from '@Components/Common/Button';
import styles from './SettingProfilePage.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import { useGetUser } from '@Hooks/NetworkHooks';

type User = {
  name: string;
  img: string | null; // img 속성에 null 추가
};

export const SettingProfilePage = () => {
  const [user, setUser] = useState<User>({
    name: '',
    img: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { data: userData, isSuccess } = useGetUser();

  useEffect(() => {
    isSuccess && setUser((prev) => ({ ...prev, name: userData?.nickname, img: userData?.profile_image_url }));
  }, [userData, isSuccess]);

  const handleSaveClick = () => {
    if (user.name.length < 1 || user.name.length > 8) {
      setErrorMessage('이름은 1~8글자 이내로 입력해주세요.');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === 'string') {
      setUser((prev) => ({ ...prev, name: event.target.value }));
    } else if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const result = reader.result as string | null; // 타입 캐스팅
        setUser((prev) => ({ ...prev, img: result }));
      };
    }
    if (0 < event.target.value.length && event.target.value.length < 9) {
      setErrorMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.imgBox}>
          <img src={user.img || undefined} alt="profile" /> {/* null 처리 추가 */}
        </div>
        <label htmlFor="file">
          <div className={styles.iconBox}>
            <SVGIcon name="camera" size={16} />
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setUser((prev) => ({ ...prev, img: reader.result as string | null }));
              };
            } else {
              alert('이미지를 업로드하는데 실패했습니다.');
            }
          }}
          id="file"
        ></input>
        <div className={styles.nameBox}>
          <p>이름</p>
          <input
            type="text"
            placeholder="이름 혹은 닉네임을 입력해주세요"
            maxLength={8}
            minLength={1}
            value={user.name}
            onChange={handleChange}
          />
          <div className={styles.error}>{errorMessage && errorMessage}</div>
        </div>
        <div className={styles.emailBox}>
          <p>연락처</p>
          <p>{userData?.email}</p>
        </div>
      </div>
      {/* TODO: [feat] 저장 버튼 클릭 시, 입력한 정보를 서버에 저장 */}
      <div className={styles.buttonBox}>
        <CTAButton onClick={handleSaveClick}>저장</CTAButton>
      </div>
    </div>
  );
};
