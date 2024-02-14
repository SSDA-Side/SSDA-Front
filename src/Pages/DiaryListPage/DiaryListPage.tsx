import { useState } from 'react';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';
import { useGetDiaryDetail } from '@Hooks/NetworkHooks';
import { useLocation } from 'react-router-dom';
import { EmotionBackgroundImage } from '@Assets/EmotionImages';

const memberList = ['나과학', '이종석', '이종석이다', '하이하이', 'say'];

export const DiaryListPage = () => {
  const [selectMember, setSelectMember] = useState<string>(memberList[0]);

  const onClickMember = (member: string) => {
    setSelectMember(member);
  };

  return (
    <div className={styles.container}>
      <div className={styles.memberTabContainer}>
        <div className={styles.memberTab}>
          {memberList.map((member) => (
            <button
              key={member}
              className={cn(styles.member, { [styles.active]: member === selectMember })}
              onClick={() => onClickMember(member)}
            >
              {member}
            </button>
          ))}
        </div>
      </div>
      <DiaryListContent />
    </div>
  );
};

const DiaryListContent = () => {
  const location = useLocation();
  const [memberId, boardId, date] = location.pathname.split('/').slice(2, 5);

  const { data: diaryDetail, isError, isSuccess } = useGetDiaryDetail(Number(memberId), Number(boardId), date);

  console.log(diaryDetail);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isSuccess) {
    return (
      <>
        <div className={styles.content}>
          <h2>{diaryDetail?.title}</h2>
          <div className={styles.etc}>
            <span>{diaryDetail?.selectDate.split('T')[0]}</span>
            <span>∙ 좋아요 {diaryDetail?.likeCount}개</span>
            <span>∙ 댓글 {diaryDetail?.commentCount}개</span>
          </div>
          <div className={styles.imgBoxContainer}>
            <div className={styles.imgBox}>
              {/* {diaryDetail?.images.map((image) => {
            if (image.imgUrl === null) return null;
            return <img key={image.id} src={image.imgUrl} alt="이미지" />;
          })} */}
              {/* TODO: 스크롤 대신 이미지 슬라이드로 변경 */}
              <img src="https://www.freecodecamp.org/news/content/images/size/w1000/2021/08/imgTag.png" alt="이미지" />
              <img
                src="https://m.luvum.co.kr/file_data/moongkler1/2022/06/12/033e077e0b5a79a368118c38292a3b92.jpeg"
                alt="이미지"
              />
            </div>
          </div>
          <div className={styles.icons}>
            {/* TODO: sprite 이미지 함수 다시 생성 */}
            <EmotionBackgroundImage index={diaryDetail?.emotionId} size="sm" />
          </div>
          <div className={styles.contents}>{diaryDetail?.contents}</div>
          <div className={styles.button}>
            {/* TODO : 버튼 기능 클릭 시 수정 및 삭제 이벤트 추가 */}
            <button>수정하기 </button>
            <span> ∙ </span>
            <button> 삭제하기</button>
          </div>
        </div>
        <DiaryListComment diaryId={diaryDetail?.id} />
      </>
    );
  }
};

const DiaryListComment = ({ diaryId }: { diaryId: number }) => {
  return <div className={styles.comment}>댓글</div>;
};
