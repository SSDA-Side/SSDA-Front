/** React */
import { useNavigate } from 'react-router-dom';

/** Style 및 Layout */
import styles from './MyBoardPage.module.scss';

/** Component */
import { AddBoardItemButton, BoardItem } from '@Components/BoardItem';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Hook */
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { useBoardList, useHeroMetadata } from '@Hooks/NetworkHooks';

/** Type */
import type { FallbackProps } from 'react-error-boundary';

/** Util */
import { ErrorUI } from '@Components/ErrorUI';
import { UserStore } from '@Store/UserStore';
import { HeroMetadata } from '@Type/Response';
import { getDescription } from '@Utils/index';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export const MyBoardPage = () => {
  return (
    <AsyncBoundary ErrorFallback={PageErrorUI} SuspenseFallback={<PageLoadingUI />}>
      <AwaitedView />
    </AsyncBoundary>
  );
};

const AwaitedView = () => {
  const navigate = useNavigate();

  const { data: heroMetadata } = useHeroMetadata();
  const setUserNickname = useSetRecoilState(UserStore);

  useEffect(() => {
    setUserNickname({ nickname: heroMetadata.nickname });
  }, [heroMetadata.nickname]);

  return (
    <>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="setting" onClick={() => navigate('/setting')} />
        </PageHeader.Left>

        <PageHeader.Center>
          <Typography as="h4">MY 일기장</Typography>
        </PageHeader.Center>

        <PageHeader.Right>
          <IconButton
            icon={heroMetadata.hasNewNotification ? 'bell_new' : 'bell'}
            onClick={() => navigate('/notification')}
          />
        </PageHeader.Right>
      </PageHeader>

      <main className={styles.contaienr}>
        <HeroSection heroMetadata={heroMetadata} />
        <BoardListSection />
      </main>
    </>
  );
};

const HeroSection = ({ heroMetadata }: { heroMetadata: HeroMetadata }) => {
  const descriptionText = getDescription(heroMetadata);

  return (
    <section className={styles.heroSection}>
      <Typography as="h1">{`${heroMetadata.nickname}님,\n소중한 일상을 공유해보세요`}</Typography>
      <Typography as="body2" className={styles.description}>
        {descriptionText}
      </Typography>
    </section>
  );
};

const PageErrorUI = (fallbackProps: FallbackProps) => (
  <>
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="setting" disabled={true} />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">MY 일기장</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="bell" disabled={true} />
      </PageHeader.Right>
    </PageHeader>

    <ErrorUI {...fallbackProps} />
  </>
);

const PageLoadingUI = () => {
  return (
    <>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="setting" disabled={true} />
        </PageHeader.Left>

        <PageHeader.Center>
          <Typography as="h4">MY 일기장</Typography>
        </PageHeader.Center>

        <PageHeader.Right>
          <IconButton icon="bell" disabled={true} />
        </PageHeader.Right>
      </PageHeader>

      <main className={styles.contaienr}>
        <section className={styles.heroSection}>
          <div className={styles.heroSkeleton} style={{ width: '30%', height: '2.5rem' }} />
          <div className={styles.heroSkeleton} style={{ width: '100%', height: '2.5rem' }} />
          <div className={styles.heroSkeleton} style={{ width: '70%', height: '1rem' }} />
        </section>

        <section className={styles.boardListSection}>
          <div className={styles.boardItemSkeleton} />
          <div className={styles.boardItemSkeleton} />
          <div className={styles.boardItemSkeleton} />
          <div className={styles.boardItemSkeleton} />
        </section>
      </main>
    </>
  );
};

const BoardListSection = () => {
  const naviage = useNavigate();
  const { data: boardList } = useBoardList();

  const boardListElements = boardList.map((board) => (
    <BoardItem onClick={() => naviage(`/myboard/${board.id}/calendar`)} key={`board-${board.id}`} {...board} />
  ));

  return (
    <section className={styles.boardListSection}>
      {boardListElements}
      <AddBoardItemButton />
    </section>
  );
};
