import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import {
  useCreateComment,
  useCreateReply,
  useDeleteComment,
  useDeleteReply,
  useGetComment,
  useGetDiaryDetail,
  useGetReply,
  useUpdateLike,
} from '@Hooks/NetworkHooks';
import { useInfiniteObserver } from '@Hooks/useInfiniteObserver';
import { ContentImage } from '@Type/Model';
import { CommentData, DiaryDetailData, todayDiaryData } from '@Type/Response';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import styles from './DiaryListPage.module.scss';

type ReplyData = CommentData | null;

const ReplyStore = atom<ReplyData>({
  key: 'reply',
  default: null,
});

export const DiaryListPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { boardId } = params;

  const location = useLocation();
  const { state } = location;
  const {
    selectedDate,
    diarys,
    diary: initialDiary,
  } = JSON.parse(state) as {
    selectedDate: Date;
    diarys: todayDiaryData[];
    diary: todayDiaryData;
  };

  // const a = useGetDiarysById({ boardId: Number(boardId), diaryId: initialDiary.id });

  useEffect(() => {
    // document.querySelector(`li#tab-${initialDiary.id}`)!.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleTabSelect = (diary: todayDiaryData) => {
    navigate(`/myboard/${boardId}/diary/${diary.id}`, {
      state: JSON.stringify({ selectedDate, diarys, diary }),
      replace: true,
    });
  };

  return (
    <div className={styles.container}>
      <Header selectedDate={selectedDate} />

      <div className={styles.diaryBody}>
        <TabList tabs={diarys} initialDiary={initialDiary} onSelect={handleTabSelect} />

        <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
          <AwaitedDiaryView diary={initialDiary} />
        </AsyncBoundary>
      </div>

      <CommentWriting isLiked={initialDiary.isLiked} />
    </div>
  );
};

const CommentWriting = ({ isLiked }: { isLiked: boolean }) => {
  const { diaryId } = useParams();
  const [contents, setContents] = useState('');

  const { mutate: updateLike } = useUpdateLike(Number(diaryId));
  const { mutate: createReply } = useCreateReply();
  const { mutate: createComment } = useCreateComment();
  const [replyData, setReplyData] = useRecoilState(ReplyStore);

  const hasReplyData = !!replyData;

  const handleClick = () => {
    if (hasReplyData) {
      createReply(
        {
          commentId: replyData.id,
          contents,
        },
        {
          onSuccess() {
            setReplyData(null);
            setContents('');
          },
        },
      );
    } else {
      createComment(
        {
          diaryId: Number(diaryId),
          contents,
        },
        {
          onSuccess() {
            setReplyData(null);
            setContents('');
          },
        },
      );
    }
  };

  return (
    <div className={styles.writingSection}>
      {hasReplyData && (
        <div className={styles.replyMode}>
          <span>
            <strong>{replyData.nickname}</strong>님에게 답글을 다는 중입니다...
          </span>
          <button onClick={() => setReplyData(null)}>X</button>
        </div>
      )}

      <IconButton
        icon="empty-heart"
        className={cn({ [styles.fillPrimary]: isLiked })}
        onClick={() => {
          updateLike();
        }}
      />
      <input placeholder="댓글 쓰기..." value={contents} onChange={(e) => setContents(e.target.value)} />
      <button onClick={handleClick}>등록</button>
    </div>
  );
};

const TabList = ({
  tabs,
  initialDiary,
  onSelect,
}: {
  tabs: todayDiaryData[];
  initialDiary: todayDiaryData;
  onSelect: (diary: todayDiaryData) => void;
}) => {
  return (
    <div>
      <ul className={styles.tabList}>
        {tabs.map((diary) => (
          <li
            key={diary.id}
            id={`tab-${diary.id}`}
            className={cn(styles.tabItem, { [styles.activeTabItem]: diary.id === initialDiary.id })}
            onClick={() => {
              document.querySelector(`li#tab-${diary.id}`)!.scrollIntoView({ behavior: 'smooth' });
              onSelect(diary);
            }}
          >
            {diary.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AwaitedDiaryView = ({ diary }: { diary: todayDiaryData }) => {
  const navigate = useNavigate();
  const { data } = useGetDiaryDetail(diary.memberId, diary.boardId, diary.selectedDate);

  const { title, contents, timeStamp, likeCount, commentCount, images, owned } = data as DiaryDetailData;

  const hasImage = images?.length !== 0;

  return (
    <>
      <div className={styles.diarySection}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={cn(styles.greyed, styles.fz14)}>
            {timeStamp} ∙ 좋아요 {likeCount}개 ∙ 댓글 {commentCount}개
          </p>
        </div>

        {hasImage && <ImageList images={images!} />}

        <div className={styles.diaryContent}>
          <p>{contents}</p>

          {owned && (
            <div className={styles.diaryTool}>
              <button onClick={() => navigate(`/myboard/${diary.boardId}/edit`, { state: { diary: data } })}>
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          )}
        </div>
      </div>

      <CommentList commentCount={commentCount} />
    </>
  );
};

const ImageList = ({ images }: { images: ContentImage[] }) => {
  return (
    <div className={styles.imageList}>
      {images.map((image) => (
        <div className={styles.imageWrapper}>
          <img src={image.imgUrl} />
        </div>
      ))}
    </div>
  );
};

const CommentList = ({ commentCount }: { commentCount: number }) => {
  const params = useParams();
  const { diaryId } = params;

  return (
    <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
      <AwaitedCommentList commentCount={commentCount} diaryId={Number(diaryId)} />
    </AsyncBoundary>
  );
};

const AwaitedCommentList = ({ commentCount, diaryId }: { commentCount: number; diaryId: number }) => {
  const { data, hasNextPage, fetchNextPage } = useGetComment(diaryId);
  const { disconnect } = useInfiniteObserver({
    parentNodeId: 'commentList',
    onIntersection: fetchNextPage,
  });

  useEffect(() => {
    !hasNextPage && disconnect();
  }, [hasNextPage]);

  return (
    <div className={styles.commentSection}>
      <h3>총 {commentCount}개의 댓글</h3>

      <ul id="commentList">
        {data.pages.map((page) =>
          page.map((comment) => (
            <li key={comment.id}>
              <CommentItem diaryId={diaryId} {...comment} />
              {comment.hasReply && <ReplyList {...comment} />}
            </li>
          )),
        )}
      </ul>

      {!hasNextPage && <p className={styles.greyed}>모든 댓글을 불러왔습니다.</p>}
    </div>
  );
};

const CommentBase = ({
  isReply = false,
  onDelete,
  ...comment
}: { isReply?: boolean; onDelete: (comment: CommentData) => void } & CommentData) => {
  const setReplyData = useSetRecoilState(ReplyStore);
  const { nickname, contents, profileUrl, timeStamp, owned, deletedMark } = comment;

  return (
    <div className={styles.rowGroup} style={{ gap: '1rem' }}>
      <div className={styles.commentProfileWrapper}>
        <img src={profileUrl} />
      </div>

      <div className={cn(styles.colGroup, { [styles.disabled]: deletedMark })}>
        <div className={styles.colGroup} style={{ gap: '.25rem' }}>
          <p className={styles.name}>{deletedMark ? '-' : nickname}</p>
          <p>{deletedMark ? '삭제된 댓글입니다' : contents}</p>
        </div>

        {!deletedMark && (
          <div className={styles.commentTool}>
            <p>{timeStamp}</p>
            {!isReply && <button onClick={() => setReplyData(comment)}>답글</button>}

            {owned && <button onClick={() => onDelete(comment)}>삭제</button>}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentItem = ({ diaryId, ...comment }: { diaryId: number } & CommentData) => {
  const { mutate: deleteComment } = useDeleteComment();

  const handleDelete = (targetComment: CommentData) => {
    deleteComment({
      commentId: targetComment.id,
      diaryId,
    });
  };

  return (
    <div className={styles.commentItem}>
      <CommentBase onDelete={handleDelete} {...comment} />
    </div>
  );
};

const ReplyList = ({ ...comment }: CommentData) => {
  return (
    <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
      <AwaitedReplyList {...comment} />
    </AsyncBoundary>
  );
};

const AwaitedReplyList = ({ ...comment }: CommentData) => {
  const { data: replys, hasNextPage, fetchNextPage } = useGetReply(comment.id);
  const { mutate: deleteReply } = useDeleteReply();

  const handleDelete = (targetComment: CommentData) => {
    deleteReply({
      commentId: comment.id,
      replyId: targetComment.id,
    });
  };

  return (
    <>
      {replys.pages.map((page) =>
        page.map(
          (reply) =>
            !reply.deletedMark && (
              <div className={styles.replyItem}>
                <CommentBase isReply={true} {...reply} onDelete={handleDelete} />
              </div>
            ),
        ),
      )}
      {hasNextPage && (
        <button className={styles.loadMore} onClick={() => fetchNextPage()}>
          나머지 답글 불러오기
        </button>
      )}
    </>
  );
};

const Header = ({ selectedDate }: { selectedDate: Date }) => {
  const navigate = useNavigate();

  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="left" onClick={() => navigate(-1)} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">
          {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(selectedDate))}
        </Typography>
      </PageHeader.Center>
    </PageHeader>
  );
};
