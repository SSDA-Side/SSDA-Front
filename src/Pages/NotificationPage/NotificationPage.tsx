import { EmotionImage } from '@Assets/EmotionImages';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { ErrorUI } from '@Components/ErrorUI';
import { NotificationItem } from '@Components/NotificationItem';
import { useGetNotifications, useHeroMetadata, useReadAllNotification } from '@Hooks/NetworkHooks';
import { useInfiniteObserver } from '@Hooks/useInfiniteObserver';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationPage.module.scss';
import { PageLoadingUI } from './NotificationPage.skeleton';

export const NotificationPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="left" onClick={() => navigate('/myboard')} />
        </PageHeader.Left>

        <PageHeader.Center>
          <Typography as="h4">알림</Typography>
        </PageHeader.Center>
      </PageHeader>

      <Body />
    </>
  );
};

const Body = () => {
  return (
    <main className={styles.container}>
      <AsyncBoundary ErrorFallback={ErrorUI} SuspenseFallback={<PageLoadingUI />}>
        <NotificationView />
      </AsyncBoundary>
    </main>
  );
};

const NotificationView = () => {
  const { data: heroMetadata } = useHeroMetadata();

  const { mutate: readAllNotifications } = useReadAllNotification();
  const { data, fetchNextPage, hasNextPage } = useGetNotifications();

  useInfiniteObserver({
    parentNodeId: 'notiList',
    onIntersection: fetchNextPage,
  });

  const hasNoNotification = data.pages[0].length === 0;

  return (
    <>
      <p className={styles.description}>30일 이내 도착한 새 알림이 보여집니다. </p>

      <button
        className={styles.allReadButton}
        onClick={() => readAllNotifications()}
        disabled={!heroMetadata.hasNewNotification}
      >
        모두 읽음 표시
      </button>

      <ul id="notiList" className={styles.notiList}>
        {hasNoNotification && <NoNotification />}
        {data.pages.map((notis) => notis?.map((noti) => <NotificationItem {...noti} />))}
      </ul>

      {!hasNextPage && <p className={styles.description}>모든 알림을 불러왔습니다. </p>}
    </>
  );
};

const NoNotification = () => {
  return (
    <div className={styles.noNotificationSection}>
      <EmotionImage type="normal" />
      <p className={styles.text}>30일 이내 도착한 알림이 없습니다.</p>
    </div>
  );
};
