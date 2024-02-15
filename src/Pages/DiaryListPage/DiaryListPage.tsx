import { useEffect, useState } from 'react';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';
import {
  useCreateComment,
  useCreateReply,
  useGetComment,
  useGetDiaryDetail,
  useGetReply,
  useGetTodayDiary,
} from '@Hooks/NetworkHooks';
import { useLocation } from 'react-router-dom';
import { EmotionBackgroundImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';

type member = {
  memberId: number;
  memberNickname: string;
  isSelect: boolean;
};

export const DiaryListPage = () => {
  const [memberList, setMemberList] = useState<member[]>([]);
  const selectedMember = memberList.find((member) => member.isSelect)?.memberId;

  const onClickMember = (member: string) => {
    setMemberList((prev) =>
      prev.map((item) => {
        if (item.memberNickname === member) {
          return { ...item, isSelect: true };
        } else {
          return { ...item, isSelect: false };
        }
      }),
    );
  };

  const location = useLocation();
  const [boardId, date] = location.pathname.split('/').slice(2, 4);

  const { mutate: getTodayDiaryMutation, isSuccess, data: todayData } = useGetTodayDiary(Number(boardId), date);

  useEffect(() => {
    getTodayDiaryMutation();
  }, []);

  useEffect(() => {
    if (todayData === undefined) return;
    setMemberList(
      todayData?.map((member, index) => ({
        memberId: member.memberId,
        memberNickname: member.nickname,
        isSelect: index === 0 ? true : false,
      })),
    );
  }, [isSuccess]);

  return (
    <div className={styles.container}>
      <div className={styles.memberTabContainer}>
        <div>
          <div className={styles.memberTab}>
            {memberList.map((member) => (
              <button
                key={`member-${member.memberId}`}
                className={cn(styles.member, { [styles.active]: member.isSelect })}
                onClick={() => onClickMember(member.memberNickname)}
              >
                {member.memberNickname}
              </button>
            ))}
          </div>
        </div>
      </div>
      {memberList.length > 0 && selectedMember !== undefined && (
        <DiaryListContent memberId={selectedMember} boardId={Number(boardId)} date={date} />
      )}
    </div>
  );
};

const DiaryListContent = ({ memberId, boardId, date }: { memberId: number; boardId: number; date: string }) => {
  const {
    data: diaryDetail,
    isError: isDiaryDetailError,
    isSuccess: isDiaryDetailSuccess,
  } = useGetDiaryDetail(memberId, boardId, date);

  return (
    <div className={styles.scrollContainer}>
      {isDiaryDetailError && <div>일기를 불러오는 중 에러가 발생했습니다.</div>}
      {isDiaryDetailSuccess && (
        <>
          <div className={styles.content}>
            <h2>{diaryDetail?.title}</h2>
            <div className={styles.etc}>
              <span>{diaryDetail?.selectDate}</span>
              <span>∙ 좋아요 {diaryDetail?.likeCount}개</span>
              <span>∙ 댓글 {diaryDetail?.commentCount}개</span>
            </div>
            <div className={styles.imgBoxContainer}>
              <div className={styles.imgBox}>
                {/* TODO: 스크롤 대신 이미지 슬라이드로 변경 */}
                {diaryDetail?.images.map((image) => {
                  if (image.imgUrl === null) return null;
                  return <img key={image.id} src={image.imgUrl} alt="이미지" />;
                })}
              </div>
            </div>
            <div className={styles.icons}>
              {/* TODO: sprite 이미지 함수 다시 생성 */}
              <EmotionBackgroundImage index={diaryDetail.emotionId} size="sm" />
            </div>
            <div className={styles.contents}>{diaryDetail?.contents}</div>
            <div className={styles.button}>
              {/* TODO : 버튼 기능 클릭 시 수정 및 삭제 이벤트 추가 */}
              <button>수정하기 </button>
              <span> ∙ </span>
              <button> 삭제하기</button>
            </div>
          </div>
          <DiaryListComment diaryId={boardId} commentCount={diaryDetail.commentCount} />
        </>
      )}
    </div>
  );
};

const DiaryListReply = ({ commentId, lastViewId }: { commentId: number; lastViewId: number }) => {
  const { mutate: getReplyMutation, data: replyData } = useGetReply(commentId, lastViewId);

  useEffect(() => {
    getReplyMutation();
  }, []);

  return (
    <>
      {replyData?.map((reply) => (
        <div className={styles.replyBox} key={`key-${reply.id}`}>
          <img src={reply.profilUrl} alt="프로필 이미지" />
          <div className={styles.body}>
            <div>
              <span>{reply.nickname}</span>
              <p>{reply.contents}</p>
            </div>
            <div className={styles.etc}>
              <span>{reply.regDate}</span>
              <span>&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

type comment = {
  status: 'comment' | 'reply';
  data: string;
  commentId: number;
  userNickname?: string;
};

type lastViewId = {
  comment: number;
  reply: number;
};

const DiaryListComment = ({ diaryId, commentCount }: { diaryId: number; commentCount: number }) => {
  const [lastViewId] = useState<lastViewId>({
    comment: 0,
    reply: 0,
  });
  const [comment, setComment] = useState<comment>({
    status: 'comment',
    commentId: 0,
    data: '',
  });

  const { mutate: getCommentMutation, data: commentData } = useGetComment(diaryId, lastViewId.comment);
  const { mutate: createCommentMutation, isSuccess: isCreateCommentSuccess } = useCreateComment(diaryId, comment.data);
  const { mutate: createReplyMutation, isSuccess: isCreateReplySuccess } = useCreateReply(
    comment?.commentId,
    comment.data,
  );

  useEffect(() => {
    setComment({ status: 'comment', commentId: 0, data: '' });
    getCommentMutation();
  }, [isCreateCommentSuccess, isCreateReplySuccess]);

  // TODO: 스크롤 이벤트 추가
  // useEffect(() => {
  //   if (commentData === undefined) return;
  //   commentData?.length > 9 && setLastViewId(commentData[commentData.length - 1]?.id);
  // }, [isGetCommentSuccess]);

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <p>{commentCount}개의 댓글</p>
      </div>
      {commentData?.map((comment) => (
        <div className={styles.commentArea} key={`comment-${comment.id}`}>
          <div className={styles.commentBox}>
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
          <DiaryListReply commentId={comment.id} lastViewId={lastViewId.reply} />
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
          <button
            onClick={() => {
              if (comment.status === 'comment') {
                createCommentMutation();
              } else {
                createReplyMutation();
              }
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
