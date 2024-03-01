import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { useNavigate } from 'react-router-dom';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';

export const DiaryListPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.diaryBody}>
        <div>
          <ul className={styles.tabList}>
            <li className={styles.tabItem}>김주현</li>
            <li className={cn(styles.tabItem, { [styles.activeTabItem]: true })}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
            <li className={styles.tabItem}>김주현</li>
          </ul>
        </div>

        <div className={styles.diarySection}>
          <div>
            <p className={styles.title}>일기 제목</p>
            <p className={cn(styles.greyed, styles.fz14)}>5일 전 ∙ 좋아요 1개 ∙ 댓글 19개</p>
          </div>

          <div className={styles.imageList}>
            <div className={styles.imageWrapper}>
              <img src="/profile/1.jpg" />
            </div>
            <div className={styles.imageWrapper}>
              <img src="/profile/1.jpg" />
            </div>
            <div className={styles.imageWrapper}>
              <img src="/profile/1.jpg" />
            </div>
          </div>

          <div className={styles.diaryContent}>
            <p>안녕하세요?</p>

            <div className={styles.diaryTool}>
              <button>수정하기</button>
              <button>삭제하기</button>
            </div>
          </div>
        </div>

        <div className={styles.commentSection}>
          <h3>총 14개의 댓글</h3>

          <ul>
            <li>
              <CommentItem />
              <ul>
                <li>
                  <ReplyItem />
                </li>
              </ul>
            </li>
          </ul>

          <p className={styles.greyed}>모든 댓글을 불러왔습니다.</p>
        </div>
      </div>

      <div className={styles.writingSection}>
        <div className={styles.replyMode}>
          <span>
            <strong>김주현</strong>님에게 답글을 다는 중입니다...
          </span>
          <button>X</button>
        </div>
        <IconButton icon="empty-heart" />
        <input placeholder="댓글 쓰기..." />
        <button>등록</button>
      </div>
    </div>
  );
};

const CommentBase = () => {
  return (
    <div className={styles.rowGroup} style={{ gap: '1rem' }}>
      <div className={styles.commentProfileWrapper}>
        <img src="/profile/1.jpg" />
      </div>

      <div className={styles.colGroup}>
        <div className={styles.colGroup} style={{ gap: '.25rem' }}>
          <p className={styles.name}>김주현</p>
          <p>안녕?</p>
        </div>

        <div className={styles.commentTool}>
          <p>5일 전</p>
          <button>답글</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
};

const CommentItem = () => {
  return (
    <div className={styles.commentItem}>
      <CommentBase />
    </div>
  );
};

const ReplyItem = () => {
  return (
    <div className={styles.replyItem}>
      <CommentBase />

      <button className={styles.loadMore}>나머지 답글 불러오기</button>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="left" onClick={() => navigate(-1)} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">2024년 03월 01일</Typography>
      </PageHeader.Center>
    </PageHeader>
  );
};
