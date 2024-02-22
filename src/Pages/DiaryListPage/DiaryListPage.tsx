import {
  useCreateComment,
  useCreateReply,
  useDeleteDiary,
  useGetComment,
  useGetDiaryDetail,
  useGetLike,
  useGetReply,
  useGetTodayDiary,
  useUpdateLike,
} from '@Hooks/NetworkHooks';
import styles from './DiaryListPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { todayDiaryData } from '@Type/Response';
import { EmotionBackgroundImage } from '@Assets/EmotionImages';
import { SVGIcon } from '@Icons/SVGIcon';

type member = {
  memberId: number;
  memberNickname: string;
  isSelect: boolean;
};

const colorList = [
  {
    backgroundColor: '#CA5B68',
    textColor: '#ffffff',
  },

  {
    backgroundColor: '#AEBCCE',
    textColor: '#424142',
  },
  {
    backgroundColor: '#F0D7C8',
    textColor: '#424142',
  },
  {
    backgroundColor: '#E2C2A0',
    textColor: '#424142',
  },
  {
    backgroundColor: '#E58F86',
    textColor: '#000000',
  },
  {
    backgroundColor: '#F0D7C8',
    textColor: '#424142',
  },
  {
    backgroundColor: '#C8ACA8',
    textColor: '#000000',
  },
  {
    backgroundColor: '#D7A285',
    textColor: '#000000',
  },
  {
    backgroundColor: '#8292B0',
    textColor: '#000000',
  },
];

export const DiaryListPage = () => {
  const location = useLocation();
  const [boardId, date] = location.pathname.split('/').slice(2, 4);
  const {
    mutate: getTodayDiaryMutation,
    isError,
    isSuccess,
    isPending,
    data: todayData,
  } = useGetTodayDiary(Number(boardId), date);
  const [selectTabColor, setSelectTabColor] = useState(colorList[0]);

  const [memberList, setMemberList] = useState<member[]>([]);

  useEffect(() => {
    getTodayDiaryMutation();
  }, []);

  return (
    <div className={styles.container}>
      {isError && <div>일기를 불러오는 중 에러가 발생했습니다.</div>}
      {/* TODO: [fix] 로딩중일 때 로딩중 컴포넌트로 변경 */}
      {isPending && <div>로딩중...</div>}
      {isSuccess && (
        <>
          <div className={styles.tablistContainer}>
            <TabList
              todayData={todayData}
              memberList={memberList}
              setMemberList={setMemberList}
              selectTabColor={selectTabColor}
            />
          </div>
          <div className={styles.scrollContainer}>
            <DiaryContent memberList={memberList} setSelectTabColor={setSelectTabColor} />
          </div>
        </>
      )}
    </div>
  );
};

type tabListProps = {
  todayData: todayDiaryData[];
  memberList: member[];
  setMemberList: React.Dispatch<React.SetStateAction<member[]>>;
  selectTabColor: { backgroundColor: string; textColor: string };
};

const TabList = ({ todayData, memberList, setMemberList, selectTabColor }: tabListProps) => {
  useEffect(() => {
    if (todayData === undefined) return;
    setMemberList(
      todayData?.map((member, index) => ({
        memberId: member.memberId,
        memberNickname: member.nickname,
        isSelect: index === 0 ? true : false,
      })),
    );
  }, []);

  const handleClickMember = (member: string) => {
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

  return (
    <div>
      <div>
        <div className={styles.memberTab}>
          {memberList.map((member) => (
            <button
              key={`member-${member.memberId}`}
              className={cn(styles.member, {
                [styles.active]: member.isSelect,
              })}
              style={{ backgroundColor: selectTabColor.backgroundColor, color: selectTabColor.textColor }}
              onClick={() => handleClickMember(member.memberNickname)}
            >
              {member.memberNickname}
            </button>
          ))}
          <div className={styles.background}></div>
        </div>
      </div>
    </div>
  );
};

type DiaryContentProps = {
  memberList: member[];
  setSelectTabColor: React.Dispatch<React.SetStateAction<{ backgroundColor: string; textColor: string }>>;
};

const DiaryContent = ({ memberList, setSelectTabColor }: DiaryContentProps) => {
  const memberId = memberList.find((member) => member.isSelect)?.memberId;

  const location = useLocation();
  const navigate = useNavigate();
  const [boardId, date] = location.pathname.split('/').slice(2, 4);

  const {
    mutate: diaryMutation,
    data: diaryDetail,
    isError,
    isSuccess,
  } = useGetDiaryDetail(Number(memberId), Number(boardId), date);

  const { mutate: deleteDiaryMutation } = useDeleteDiary();

  useEffect(() => {
    if (memberId === undefined) return;
    diaryMutation();
  }, [memberId]);

  useEffect(() => {
    if (isSuccess) {
      setSelectTabColor(colorList[diaryDetail?.emotionId]);
    }
  }, [isSuccess]);

  return (
    <div>
      {isError && <div>일기를 불러오는 중 에러가 발생했습니다.</div>}
      {isSuccess && (
        <div className={styles.content}>
          <h2>{diaryDetail?.title}</h2>
          <div className={styles.etc}>
            <span>{diaryDetail?.timeStamp} </span>
            <span>∙ 좋아요 {diaryDetail?.likeCount}개 </span>
            <span>∙ 댓글 {diaryDetail?.commentCount}개</span>
          </div>
          {/* TODO: [feat] 스크롤 대신 이미지 슬라이드로 변경, [fix] 이미지가 정상적으로 처리될 때까지 공백, [fix] 이미지가 있을 경우 이모지 위치랑 게시글 내용 테스트 */}
          {/* <div className={styles.imgBoxContainer}>
            <div className={styles.imgBox}>
              {diaryDetail?.images.map((image) => {
                if (image.imgUrl === null) return null;
                return <img key={image.id} src={image.imgUrl} alt="이미지" />;
              })}
            </div>
          </div> */}
          <div className={styles.contents}>
            <div className={styles.icons}>
              <EmotionBackgroundImage index={Number(diaryDetail?.emotionId)} />
            </div>
            {diaryDetail?.contents}
          </div>
          <div className={styles.button}>
            <button
              onClick={() => {
                navigate(`/myboard/${boardId}/edit`);
              }}
            >
              수정하기
            </button>
            <span> ∙ </span>
            <button
              onClick={() => {
                deleteDiaryMutation(
                  {
                    diaryId: diaryDetail?.id as number,
                  },
                  {
                    onSuccess: () => {
                      navigate(`/myboard/calendar/${boardId}`);
                    },
                  },
                );
              }}
            >
              삭제하기
            </button>
          </div>
          <div className={styles.commentCount}>
            <p>{diaryDetail?.commentCount}개의 댓글</p>
          </div>
          <DiaryComment diaryId={diaryDetail.id} />
        </div>
      )}
    </div>
  );
};

type DiaryCommentProps = {
  diaryId: number;
};

const DiaryComment = ({ diaryId }: DiaryCommentProps) => {
  const [lastViewId] = useState({
    comment: 0,
    reply: 0,
  });
  const [comment, setComment] = useState({
    status: 'comment',
    commentId: 0,
    data: '',
    userNickname: '',
  });

  const { data: commentData, isSuccess: getCommentSuccess } = useGetComment(diaryId, lastViewId.comment);
  const { mutate: createCommentMutation, isSuccess: commentSuccess } = useCreateComment(diaryId, comment.data);
  const { mutate: createReplyMutation, isSuccess: replySuccess } = useCreateReply(comment?.commentId, comment.data);
  const { data: likeData, isSuccess: likeSuccess } = useGetLike(diaryId);
  const { mutate: updateLikeMutation } = useUpdateLike(diaryId);

  useEffect(() => {
    if (commentSuccess || replySuccess) {
      setComment({ status: 'comment', commentId: 0, data: '', userNickname: '' });
    }
  }, [commentSuccess, replySuccess]);

  return (
    <>
      {getCommentSuccess && likeSuccess && (
        <div className={styles.commentContainer}>
          {commentData?.map((comment) => (
            <div className={styles.commentArea} key={`comment-${comment.id}`}>
              <div className={styles.commentBox}>
                <img src={comment.profileUrl} alt="프로필 이미지" />
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
                        setComment({
                          status: 'reply',
                          commentId: comment.id,
                          data: '',
                          userNickname: comment?.nickname,
                        });
                      }}
                    >
                      답글 달기
                    </button>
                  </div>
                </div>
              </div>
              <DiaryReply commentId={comment.id} lastViewId={lastViewId.reply} />
            </div>
          ))}
          <div className={styles.writeContainer}>
            {comment.status === 'reply' && (
              <div className={styles.replyView}>
                <span>{comment?.userNickname}에게 답글 작성 중</span>
                <button
                  onClick={() => {
                    setComment({ status: 'comment', commentId: 0, data: '', userNickname: '' });
                  }}
                >
                  <SVGIcon name="close" size={12} />
                </button>
              </div>
            )}
            <div className={styles.commentView}>
              <button
                onClick={() => {
                  updateLikeMutation();
                }}
              >
                {likeData?.length === 0 ? <SVGIcon name="empty-love" /> : <SVGIcon name="love" />}
              </button>
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
                style={{ color: `${comment.data === '' ? '#9e9e9e' : '#FF8066'}` }}
                onClick={() => {
                  if (comment.data === '') return;
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
      )}
    </>
  );
};

const DiaryReply = ({ commentId, lastViewId }: { commentId: number; lastViewId: number }) => {
  const { data: replyData, isSuccess } = useGetReply(commentId, lastViewId);

  return (
    <>
      {isSuccess &&
        replyData?.map((reply) => (
          <div className={styles.replyBox} key={`key-${reply.id}`}>
            <img src={reply.profileUrl} alt="프로필 이미지" />
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
