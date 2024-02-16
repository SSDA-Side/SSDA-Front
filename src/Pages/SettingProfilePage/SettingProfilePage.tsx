import React, { useEffect, useState } from 'react';
import { CTAButton } from '@Components/Common/Button';
import styles from './SettingProfilePage.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import { useGetUser } from '@Hooks/NetworkHooks';

type User = {
  name: string;
  img: string | File;
};

export const SettingProfilePage = () => {
  const [user, setUser] = useState<User>({
    name: '',
    img: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { data: userData, isSuccess, isError } = useGetUser();

  useEffect(() => {
    isSuccess && setUser((prev) => ({ ...prev, name: userData?.nickname, img: userData?.profile_image_url }));
  }, [isSuccess]);

  const handleSaveClick = () => {
    if (user.name.length < 1 || user.name.length > 8) {
      setErrorMessage('이름은 1~8글자 이내로 입력해주세요.');
    }
  };

  const handleChange = (event) => {
    setUser(event.target.value);
    if (0 < event.target.value.length && event.target.value.length < 9) {
      setErrorMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src={user.img} alt="profile" />
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
              setUser((prev) => ({ ...prev, img: reader.result }));
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
      <div className={styles.buttonBox}>
        <CTAButton onClick={handleSaveClick}>저장</CTAButton>
      </div>
    </div>
  );
};
