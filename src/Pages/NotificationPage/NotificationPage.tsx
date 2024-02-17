import { EmotionImage } from '@Assets/EmotionImages';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { NotificationItem } from '@Components/NotificationItem';
import { useGetNotifications } from '@Hooks/NetworkHooks';
import { useInfiniteObserver } from '@Hooks/useInfiniteObserver';
import { PageLayout } from '@Layouts/PageLayout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageErrorUI } from './NotificationPage.error';
import styles from './NotificationPage.module.scss';
import { PageLoadingUI } from './NotificationPage.skeleton';

export const NotificationPage = () => {
  return <PageLayout header={<Head />} body={<Body />} />;
};

const Head = () => {
  const navigate = useNavigate();

  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="left" onClick={() => navigate('/myboard')} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">알림</Typography>
      </PageHeader.Center>
    </PageHeader>
  );
};

const Body = () => {
  return (
    <main className={styles.container}>
      <AsyncBoundary ErrorFallback={PageErrorUI} SuspenseFallback={<PageLoadingUI />}>
        <NotificationView />
      </AsyncBoundary>
    </main>
  );
};

const NotificationView = () => {
  const { data, fetchNextPage, hasNextPage } = useGetNotifications();
  const { disconnect: disconnectObserver } = useInfiniteObserver({
    parentNodeId: 'notiList',
    onIntersection: fetchNextPage,
  });

  console.log(data);

  const hasNoNotification = data.pages.length === 0;

  useEffect(() => {
    !hasNextPage && disconnectObserver();
  }, [hasNextPage]);

  return (
    <>
      <p className={styles.description}>30일 이내 도착한 새 알림이 보여집니다. </p>

      <button className={styles.allReadButton} onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        모두 읽음 표시
      </button>

      <ul id="notiList" className={styles.notiList}>
        {hasNoNotification && <NoNotification />}
        {data.pages.map((notis) => notis.map((noti) => <NotificationItem {...noti} />))}
      </ul>
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
