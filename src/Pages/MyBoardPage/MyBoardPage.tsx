/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MyBoardPage.module.scss';

/** Component */
import { AddBoardItemButton, BoardItem } from '@Components/BoardItem';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Hook */
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { useBoardList, useHeroData } from '@Hooks/NetworkHooks';

/** Type */
import type { FallbackProps } from 'react-error-boundary';

/** Util */
import { getDescription } from '@Utils/index';

export const MyBoardPage = () => {
  return <PageLayout header={<Head />} body={<Body />} />;
};

const Head = () => {
  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="setting" />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">MY 일기장</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="bell" />
      </PageHeader.Right>
    </PageHeader>
  );
};

const Body = () => {
  return (
    <main className={styles.contaienr}>
      <AsyncBoundary ErrorFallback={HeroErrorUI} SuspenseFallback={<HeroLoadingUI />}>
        <HeroSection />
      </AsyncBoundary>

      <AsyncBoundary ErrorFallback={BoardListErrorUI} SuspenseFallback={<BoardListLoadingUI />}>
        <BoardListSection />
      </AsyncBoundary>
    </main>
  );
};

const HeroSection = () => {
  const { data: heroData, isSuccess } = useHeroData();

  if (!isSuccess) {
    return;
  }

  const descriptionText = getDescription(heroData);

  return (
    <section className={styles.heroSection}>
      <Typography as="h1">{`${heroData.nickname}님,\n소중한 일상을 공유해보세요`}</Typography>
      <Typography as="body2" className={styles.description}>
        {descriptionText}
      </Typography>
    </section>
  );
};

const HeroErrorUI = ({ error, resetErrorBoundary }: FallbackProps) => (
  <section className={styles.heroSection}>
    <Typography as="h1">정보를 불러오는데 실패했어요😇</Typography>
    <Typography as="body1">유저의 정보와 일기장 정보를 가져오는 데 실패했어요</Typography>
    <Typography as="body1">{error.message}</Typography>

    <button onClick={() => resetErrorBoundary()}>다시 시도하기</button>
  </section>
);

const HeroLoadingUI = () => {
  return (
    <section className={styles.heroSection}>
      <Typography as="h1">{`-님,\n소중한 일상을 공유해보세요`}</Typography>
      <Typography as="body2" className={styles.description}>
        일기 정보를 불러오는 중입니다...
      </Typography>
    </section>
  );
};

const BoardListSection = () => {
  const { data: boardList, isSuccess } = useBoardList();

  if (!isSuccess) {
    return;
  }

  const boardListElements = boardList.map((board) => <BoardItem key={`board-${board.id}`} {...board} />);

  return (
    <section className={styles.boardListSection}>
      {boardListElements}
      <AddBoardItemButton />
    </section>
  );
};

const BoardListLoadingUI = () => {
  return (
    <section className={styles.boardListSection}>
      <div className={styles.boardItemSkeleton} />
      <div className={styles.boardItemSkeleton} />
      <div className={styles.boardItemSkeleton} />
      <div className={styles.boardItemSkeleton} />
    </section>
  );
};

const BoardListErrorUI = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div>
    <p>Ooppsss... 일기장 목록을 불러오는데 오류가 났어요</p>
    <p>{error.message}</p>
    <button onClick={() => resetErrorBoundary()}>다시 시도</button>
  </div>
);
