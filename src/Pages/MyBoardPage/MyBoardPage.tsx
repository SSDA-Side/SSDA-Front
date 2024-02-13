/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MyBoardPage.module.scss';

/** Component */
import { AddBoardItemButton, BoardItem } from '@Components/BoardItem';
import { CTAButton, IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Hook */
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { useBoardList, useHeroData } from '@Hooks/NetworkHooks';

/** Type */
import type { FallbackProps } from 'react-error-boundary';

/** Util */
import { getDescription } from '@Utils/index';
import { SVGIcon } from '@Icons/SVGIcon';

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
      <AsyncBoundary ErrorFallback={PageErrorUI} SuspenseFallback={<PageLoadingUI />}>
        <HeroSection />
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

const PageErrorUI = ({ error, resetErrorBoundary }: FallbackProps) => (
  <section className={styles.errorContainer}>
    <div className={styles.group}>
      <div className={styles.red}>
        <SVGIcon name="error" />
      </div>

      <div className={styles.red}>
        <Typography as="body2">통신 실패</Typography>
      </div>
    </div>

    <div className={styles.delimitor} />

    <div className={styles.group}>
      <Typography as="body2">오류가 발생했어요.</Typography>
      <Typography as="body2">아래의 버튼을 통해 다시 시도해보세요.</Typography>
    </div>

    <CTAButton onClick={() => resetErrorBoundary()}>다시 가져오기</CTAButton>
  </section>
);

const PageLoadingUI = () => {
  return (
    <>
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
    </>
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
