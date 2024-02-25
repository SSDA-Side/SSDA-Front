import { useEffect, useState } from 'react';
import { CTAButton } from '@Components/Common/Button';
import styles from './SettingProfilePage.module.scss';
import { SVGIcon } from '@Icons/SVGIcon';
import { useGetUser, useUpdateUser } from '@Hooks/NetworkHooks';
import { useNavigate } from 'react-router-dom';

type User = {
  name: string;
  img: string | File;
};

export const SettingProfilePage = () => {
  const [user, setUser] = useState<User>({
    name: '',
    img: '',
  });
  const [prevImg, setPrevImg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { data: userData, isSuccess } = useGetUser();
  const { mutate: updateUser } = useUpdateUser();
  const navigate = useNavigate();

  useEffect(() => {
    isSuccess &&
      setUser((prev) => ({ ...prev, name: userData?.nickname, img: new File([], userData?.profile_image_url) }));
  }, [userData, isSuccess]);

  const handleSaveClick = () => {
    if (user.name.length < 1 || user.name.length > 8) {
      setErrorMessage('이름은 1~8글자 이내로 입력해주세요.');
    } else {
      updateUser(
        {
          nickname: user.name,
          profileUrl: user.img,
        },
        {
          onSuccess: () => {
            navigate('/setting');
          },
          onError: () => {
            alert('프로필을 수정하는데 실패했습니다.');
          },
        },
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.imgBox}>
          <img src={prevImg} alt="profile" />
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
              e.target.files && setUser((prev) => ({ ...prev, img: e.target.files[0] as File }));
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setPrevImg(reader.result as string);
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
            onChange={(e) => {
              if (1 > e.target.value.length && e.target.value.length > 8) {
                setErrorMessage('');
              } else {
                setUser((prev) => ({ ...prev, name: e.target.value }));
              }
            }}
          />
          <div className={styles.error}>{errorMessage && errorMessage}</div>
        </div>
        <div className={styles.emailBox}>
          <p>연락처</p>
          <p>{userData?.email}</p>
        </div>
      </div>
      {/* TODO: [fix] 이미지가 정상적으로 업로드되는지 추후에 확인 */}
      <div className={styles.buttonBox}>
        <CTAButton onClick={handleSaveClick}>저장</CTAButton>
      </div>
    </div>
  );
};
