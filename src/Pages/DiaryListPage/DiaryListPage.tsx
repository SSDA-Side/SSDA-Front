import { useEffect, useState } from 'react';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';
import { useCreateComment, useCreateReply, useGetComment, useGetDiaryDetail } from '@Hooks/NetworkHooks';
import { useLocation } from 'react-router-dom';
import { EmotionBackgroundImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';

const memberList = ['나과학', '이종석', '이종석이다', '하이하이', 'say'];

export const DiaryListPage = () => {
  const [selectMember, setSelectMember] = useState<string>(memberList[0]);

  const onClickMember = (member: string) => {
    setSelectMember(member);
  };

  return (
    <div className={styles.container}>
      <div className={styles.memberTabContainer}>
        <div>
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
      </div>
      <DiaryListContent />
    </div>
  );
};

const DiaryListContent = () => {
  const location = useLocation();
  const [memberId, boardId, date] = location.pathname.split('/').slice(2, 5);

  const { data: diaryDetail, isError, isSuccess } = useGetDiaryDetail(Number(memberId), Number(boardId), date);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isSuccess) {
    return (
      <div className={styles.scrollContainer}>
        <div className={styles.content}>
          <h2>{diaryDetail?.title}</h2>
          <div className={styles.etc}>
            <span>{diaryDetail?.selectDate}</span>
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
      </div>
    );
  }
};

type comment = {
  status: 'comment' | 'reply';
  data: string;
  commentId: number;
  userNickname?: string;
};

const DiaryListComment = ({ diaryId }: { diaryId: number }) => {
  const [lastViewId, setLastViewId] = useState<number>(0);
  const [comment, setComment] = useState<comment>({
    status: 'comment',
    commentId: 0,
    data: '',
  });

  const { mutate: getCommentMutation, data: commentData } = useGetComment(diaryId, lastViewId);
  const { mutate: createCommentMutation, isSuccess: isCreateCommentSuccess } = useCreateComment(diaryId, comment.data);
  const { mutate: createReplyMutation } = useCreateReply(diaryId, comment?.commentId, comment.data);

  useEffect(() => {
    setComment({ status: 'comment', commentId: 0, data: '' });
    getCommentMutation();
  }, [isCreateCommentSuccess]);

  // TODO: 스크롤 이벤트 추가
  // useEffect(() => {
  //   if (commentData === undefined) return;
  //   commentData?.length > 9 && setLastViewId(commentData[commentData.length - 1]?.id);
  // }, [isGetCommentSuccess]);

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <p>{commentData?.length}개의 댓글</p>
      </div>
      {commentData?.map((comment) => (
        <div key={comment.id} className={styles.commentBox}>
          <img src={comment.profilUrl} alt="프로필 이미지" />
          <div className={styles.body}>
            <div>
              <span>{comment.nickname}</span>
              <p>{comment.contents}</p>
            </div>
            <div className={styles.etc}>
              <span>{comment.regDate}</span>
              <span>&nbsp;&nbsp;</span>
              <button
                onClick={() => {
                  setComment({ status: 'reply', commentId: comment.id, data: '', userNickname: comment?.nickname });
                }}
              >
                답글 달기
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.writeComment}>
        {/* TODO: 좋아요 상태에 따라 버튼 변경 */}
        {comment.status === 'reply' && (
          <div className={styles.replyView}>
            <span>{comment?.userNickname}에게 답글 작성 중</span>
            <button
              onClick={() => {
                setComment({ status: 'comment', commentId: 0, data: '' });
              }}
            >
              <SVGIcon name="close" size={12} />
            </button>
          </div>
        )}
        <div className={styles.commentView}>
          <button>{false ? <SVGIcon name="empty-love" /> : <SVGIcon name="love" />}</button>
          <input
            type="text"
            className={styles.addComment}
            maxLength={30}
            placeholder="댓글 쓰기..."
            value={comment.data}
            onChange={(event) => {
              setComment((prev) => ({ ...prev, data: event.target.value }));
            }}
          />
          <button onClick={() => createCommentMutation()}>등록</button>
        </div>
      </div>
    </div>
  );
};
