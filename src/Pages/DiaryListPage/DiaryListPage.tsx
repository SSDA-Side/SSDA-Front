import {
  useCreateComment,
  useCreateReply,
  useDeleteComment,
  useDeleteDiary,
  useDeleteReply,
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

// TODO: [feat] 댓글, 답글 삭제 기능 추가
// TODO: [design] 댓글이 삭제된 경우 댓글이 없다는 문구 추가
// TODO: [feat] 좋아요 모달 추가
// TODO: [feat] 댓글, 답글 무한 스크롤로 변경
export const DiaryListPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const memberId = searchParams.get('mId') || 0;
  const date = searchParams.get('date') || '';

  const boardId = location.pathname.split('/')[2];

  const [year, month, day] = date.split('-');

  const {
    mutate: getTodayDiaryMutation,
    isError,
    isSuccess,
    isPending,
    data: todayData,
  } = useGetTodayDiary(Number(boardId), date);

  const [selectTabColor, setSelectTabColor] = useState(colorList[0]);
  const navigate = useNavigate();

  useEffect(() => {
    getTodayDiaryMutation();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(`/myboard/${location.pathname.split('/')[2]}/calendar`)}>
          <SVGIcon name="left" />
        </button>
        <div>{`${year}년 ${month}월 ${day}일`}</div>
      </div>
      {isError && <div>일기를 불러오는 중 에러가 발생했습니다.</div>}
      {isPending && <div>로딩중...</div>}
      {isSuccess && (
        <>
          <div className={styles.tablistContainer}>
            <TabList todayData={todayData} selectTabColor={selectTabColor} />
          </div>
          <div className={styles.scrollContainer}>
            {memberId === null ? (
              <div>일기를 불러오는 중 에러가 발생했습니다.</div>
            ) : (
              <DiaryContent memberId={memberId} setSelectTabColor={setSelectTabColor} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

type tabListProps = {
  todayData: todayDiaryData[];
  selectTabColor: { backgroundColor: string; textColor: string };
};

const TabList = ({ todayData, selectTabColor }: tabListProps) => {
  const searchParams = new URLSearchParams(location.search);
  const memberId = searchParams.get('mId');
  const [memberList, setMemberList] = useState<member[]>([]);
  const navigate = useNavigate();
  const boardId = location.pathname.split('/')[2];

  useEffect(() => {
    if (todayData === undefined) return;
    setMemberList(
      todayData?.map((member) => ({
        memberId: member.memberId,
        memberNickname: member.nickname,
        isSelect: +memberId === member.memberId,
      })),
    );
  }, [memberId]);

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
              style={{
                backgroundColor: member.isSelect ? selectTabColor.backgroundColor : '#FAFAFA',
                color: member.isSelect ? selectTabColor.textColor : '#606160',
              }}
              onClick={() => {
                navigate(`/myboard/${boardId}/detail?date=${searchParams.get('date')}&mId=${member.memberId}`);
              }}
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
  memberId: string;
  setSelectTabColor: React.Dispatch<React.SetStateAction<{ backgroundColor: string; textColor: string }>>;
};

const DiaryContent = ({ memberId, setSelectTabColor }: DiaryContentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date');
  const boardId = location.pathname.split('/')[2];

  const { data: diaryDetail, isError, isSuccess } = useGetDiaryDetail(Number(memberId), Number(boardId), date);

  const { mutate: deleteDiaryMutation } = useDeleteDiary();

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
                      navigate(`/myboard/${boardId}/calendar`);
                    },
                  },
                );
              }}
            >
              삭제하기
            </button>
          </div>
          <div className={styles.commentCount}>
            <p>{diaryDetail.commentCount}개의 댓글</p>
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
  const { mutate: createCommentMutation } = useCreateComment();
  const { mutate: deleteCommentMutation } = useDeleteComment();
  const { mutate: createReplyMutation } = useCreateReply();
  const { data: likeData, isSuccess: likeSuccess } = useGetLike(diaryId);
  const { mutate: updateLikeMutation } = useUpdateLike(diaryId);
  const navigate = useNavigate();
  const boardId = useLocation().pathname.split('/')[2];

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
                    <span>{comment.timeStamp}</span>
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
                      답글
                    </button>
                    <span> ∙ </span>

                    <button
                      onClick={() => {
                        // diaryId, comment.commentId
                        deleteCommentMutation({
                          diaryId: +diaryId,
                          commentId: comment.id,
                        });
                      }}
                    >
                      삭제
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
            <button className={styles.addDiary} onClick={() => navigate(`/myboard/${boardId}/write`)}>
              <SVGIcon name="add" size={16} />
            </button>
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
                    // diaryId, comment.data
                    createCommentMutation(
                      { diaryId, contents: comment.data },
                      {
                        onSuccess: () => {
                          setComment({ status: 'comment', commentId: 0, data: '', userNickname: '' });
                        },
                      },
                    );
                  } else {
                    createReplyMutation(
                      { commentId: comment.commentId, contents: comment.data },
                      {
                        onSuccess: () => {
                          setComment({ status: 'comment', commentId: 0, data: '', userNickname: '' });
                        },
                      },
                    );
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

type DiaryReplyProps = {
  commentId: number;
  lastViewId: number;
};

const DiaryReply = ({ commentId, lastViewId }: DiaryReplyProps) => {
  const { data: replyData, isSuccess } = useGetReply(commentId, lastViewId);
  const { mutate: deleteReplyMutation } = useDeleteReply();

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
                <span>{reply.timeStamp}</span>
                <span> ∙ </span>
                <button
                  onClick={() => {
                    deleteReplyMutation({ commentId: +commentId, replyId: reply.id });
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
