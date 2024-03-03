import { EmotionImage } from '@Assets/EmotionImages';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { ErrorUI } from '@Components/ErrorUI';
import {
  useCreateComment,
  useCreateReply,
  useDeleteComment,
  useDeleteDiary,
  useDeleteReply,
  useGetComment,
  useGetDiaryDetail,
  useGetDiarysById,
  useGetReply,
  useUpdateLike,
} from '@Hooks/NetworkHooks';
import { useInfiniteObserver } from '@Hooks/useInfiniteObserver';
import { useModal } from '@Hooks/useModal';
import { ContentImage } from '@Type/Model';
import { CommentData, todayDiaryData } from '@Type/Response';
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
  const setReplyMode = useSetRecoilState(ReplyStore);

  useEffect(() => {
    return () => setReplyMode(null);
  }, []);

  return (
    <AsyncBoundary ErrorFallback={ErrorUI} SuspenseFallback={<InitialLoadingUI />}>
      <AwaitedDiaryListPage />
    </AsyncBoundary>
  );
};

const AwaitedDiaryListPage = () => {
  const { boardId, diaryId } = useParams();

  const { data: diarys } = useGetDiarysById({ diaryId: Number(diaryId) });
  const targetDiaryIndex = diarys.findIndex((diary) => diary.id === Number(diaryId));
  const [currentTabIndex, setCurrentTabIndex] = useState(targetDiaryIndex);
  const targetDiary = diarys[currentTabIndex];

  useEffect(() => {
    window.history.replaceState('', '', `/myboard/${boardId}/diary/${targetDiary.id}`);
  }, [targetDiary]);

  const handleTabSelect = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className={styles.container}>
      <Header {...targetDiary} />

      <div className={styles.diaryBody}>
        <TabList tabs={diarys} currentDiary={targetDiary} onSelect={handleTabSelect} />

        <AsyncBoundary ErrorFallback={ErrorUI} SuspenseFallback={<DiaryLoadingUI />}>
          <AwaitedDiaryView targetDiary={targetDiary} />
        </AsyncBoundary>
      </div>

      {/* <CommentWriting isLiked={targetDiary.liked} /> */}
    </div>
  );
};

const DiaryLoadingUI = () => {
  return (
    <>
      <div className={styles.diarySection}>
        <div className={styles.rowGroup}>
          <div style={{ flex: 1 }}>
            <div className={styles.skeletonItem} style={{ width: '70%', height: '1.3125rem', marginBottom: '.5rem' }} />
            <div className={styles.skeletonItem} style={{ width: '50%', height: '.875rem' }} />
          </div>

          <div className={styles.skeletonItem} style={{ width: '3rem', height: '3rem', borderRadius: '9999px' }} />
        </div>

        <div className={styles.skeletonItem} style={{ width: '100%', aspectRatio: '1 / 1' }} />

        <div className={styles.diaryContent}>
          <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
          <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
          <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
        </div>
      </div>
    </>
  );
};

const InitialLoadingUI = () => {
  return (
    <>
      <div className={styles.container}>
        <PageHeader>
          <PageHeader.Left>
            <IconButton icon="left" />
          </PageHeader.Left>

          <PageHeader.Center>
            <Typography as="h4">
              <div className={styles.skeletonItem} style={{ width: '11.25rem', height: '1rem' }} />
            </Typography>
          </PageHeader.Center>
        </PageHeader>

        <div className={styles.diaryBody}>
          <div>
            <ul className={styles.tabList}>
              <li className={cn(styles.tabItem)}>{'　　　'}</li>
              <li className={cn(styles.tabItem)}>{'　　　'}</li>
              <li className={cn(styles.tabItem)}>{'　　　'}</li>
            </ul>
          </div>

          <div className={styles.diarySection}>
            <div className={styles.rowGroup}>
              <div style={{ flex: 1 }}>
                <div
                  className={styles.skeletonItem}
                  style={{ width: '70%', height: '1.3125rem', marginBottom: '.5rem' }}
                />
                <div className={styles.skeletonItem} style={{ width: '50%', height: '.875rem' }} />
              </div>

              <div className={styles.skeletonItem} style={{ width: '3rem', height: '3rem', borderRadius: '9999px' }} />
            </div>

            <div className={styles.skeletonItem} style={{ width: '100%', aspectRatio: '1 / 1' }} />

            <div className={styles.diaryContent}>
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
              <div className={styles.skeletonItem} style={{ width: '100%', height: '1rem' }} />
            </div>
          </div>
        </div>

        <CommentWriting isLiked={false} />
      </div>
    </>
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
        className={cn(styles.emptyFill, { [styles.fillPrimary]: isLiked })}
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
  currentDiary,
  onSelect,
}: {
  tabs: todayDiaryData[];
  currentDiary: todayDiaryData;
  onSelect: (index: number) => void;
}) => {
  return (
    <div>
      <ul className={styles.tabList}>
        {tabs.map((diary, index) => (
          <li
            key={diary.id}
            id={`tab-${diary.id}`}
            className={cn(styles.tabItem, { [styles.activeTabItem]: diary.id === currentDiary.id })}
            onClick={() => {
              document.querySelector(`li#tab-${diary.id}`)!.scrollIntoView({ behavior: 'smooth' });
              onSelect(index);
            }}
          >
            {diary.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AwaitedDiaryView = ({ targetDiary }: { targetDiary: todayDiaryData }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { data: currentDiary } = useGetDiaryDetail(targetDiary.id);
  const { title, contents, timeStamp, likeCount, commentCount, images, owned } = currentDiary;

  const { openConfirm } = useModal();
  const { mutate: deleteDiary } = useDeleteDiary();

  const hasImage = images?.length !== 0;

  const handleDelete = () => {
    openConfirm({
      contents: '일기를 삭제하시겠습니까?',
      onYes() {
        deleteDiary({ diaryId: currentDiary.id });
      },
    });
  };

  return (
    <>
      <div className={styles.diarySection}>
        <div className={styles.rowGroup}>
          <div style={{ flex: 1 }}>
            <p className={styles.title}>{title}</p>
            <p className={cn(styles.greyed, styles.fz14)}>
              {timeStamp} ∙ 좋아요 {likeCount}개 ∙ 댓글 {commentCount}개
            </p>
          </div>

          <EmotionImage index={currentDiary.emotionId} size="sm" />
        </div>

        {hasImage && <ImageList images={images!} />}

        <div className={styles.diaryContent}>
          <p>{contents}</p>

          {owned && (
            <div className={styles.diaryTool}>
              <button onClick={() => navigate(`/myboard/${boardId}/edit`, { state: { diary: currentDiary } })}>
                수정하기
              </button>
              <button onClick={() => handleDelete()}>삭제하기</button>
            </div>
          )}
        </div>

        <CommentWriting isLiked={currentDiary.liked} />
      </div>

      <CommentList commentCount={commentCount} diaryId={currentDiary.id} />
    </>
  );
};

const ImageList = ({ images }: { images: ContentImage[] }) => {
  return (
    <div className={styles.imageList}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageWrapper}>
          <img src={image.imgUrl} />
        </div>
      ))}
    </div>
  );
};

const CommentList = ({ commentCount, diaryId }: { commentCount: number; diaryId: number }) => {
  return (
    <AsyncBoundary ErrorFallback={() => <></>} SuspenseFallback={<></>}>
      <AwaitedCommentList commentCount={commentCount} diaryId={diaryId} />
    </AsyncBoundary>
  );
};

const AwaitedCommentList = ({ commentCount, diaryId }: { commentCount: number; diaryId: number }) => {
  const { state } = useLocation();
  const { data, hasNextPage, fetchNextPage } = useGetComment(diaryId);

  useInfiniteObserver({
    parentNodeId: 'commentList',
    onIntersection: fetchNextPage,
  });

  useEffect(() => {
    if (state === null) {
      return;
    }

    const { notiCommentId } = state as { notiCommentId: -1 };

    if (notiCommentId === -1) {
      return;
    }

    document.querySelector(`#comment-${notiCommentId}`)?.scrollIntoView({ behavior: 'smooth' });
    document.querySelector(`#comment-${notiCommentId}`)?.classList.add(styles.flash);
  }, []);

  const hasComment = commentCount !== 0;
  const hasNoComment = commentCount === 0;
  const allCommentLoaded = !hasNextPage && hasComment;

  return (
    <div className={styles.commentSection}>
      {hasComment && <h3>총 {commentCount}개의 댓글</h3>}
      {hasNoComment && <h3>댓글이 없습니다</h3>}

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

      {allCommentLoaded && <p className={styles.greyed}>모든 댓글을 불러왔습니다.</p>}
      {hasNoComment && <p className={styles.greyed}>처음으로 댓글을 달아볼까요?</p>}
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
    <div id={`comment-${comment.id}`} className={styles.commentItem}>
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
  const { state } = useLocation();
  const { data: replys, hasNextPage, fetchNextPage } = useGetReply(comment.id);
  const { mutate: deleteReply } = useDeleteReply();

  useEffect(() => {
    if (state === null) {
      return;
    }

    const { notiReplyId } = state as { notiReplyId: -1 };

    if (notiReplyId === -1) {
      return;
    }

    document.querySelector(`#reply-${notiReplyId}`)?.scrollIntoView({ behavior: 'smooth' });
    document.querySelector(`#reply-${notiReplyId}`)?.classList.add(styles.flash);
  }, []);

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
              <div id={`reply-${reply.id}`} key={reply.id} className={styles.replyItem}>
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

const Header = ({ selectedDate }: { selectedDate: string }) => {
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
