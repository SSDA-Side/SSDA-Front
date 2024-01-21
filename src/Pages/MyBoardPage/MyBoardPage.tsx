/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MyBoardPage.module.scss';

/** Component */
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { AddBoardItemButton, BoardItem } from '@Components/BoardItem';

/** Hook */
import { useBoardList, useHeroData } from '@Hooks/NetworkHooks';

export const MyBoardPage = () => {
  return <PageLayout header={<Head />} body={<Body />} />;
};

const Head = () => {
  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="menu" />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h4">MY 일기장</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="header/bell" />
        <IconButton icon="user" />
      </PageHeader.Right>
    </PageHeader>
  );
};

const Body = () => {
  return (
    <main className={styles.contaienr}>
      <HeroSection />
      <BoardListSection />
    </main>
  );
};

const HeroSection = () => {
  const { data: heroData, isError, refetch } = useHeroData();

  const username = heroData?.username || '-';
  const sharedPeopleCount = heroData?.sharedPeopleCount || '-';
  const sharedDiaryCount = heroData?.sharedDiaryCount || '-';

  if (isError) {
    return (
      <section className={styles.heroSection}>
        <Typography as="h1">정보를 불러오는데 실패했어요😇</Typography>
        <Typography as="body1">유저의 정보와 일기장 정보를 가져오는 데 실패했어요</Typography>
        <button onClick={() => refetch()}>다시 시도하기</button>
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      <Typography as="h1">{`${username}님,\n소중한 일상을 공유해보세요`}</Typography>
      <Typography as="body2" className={styles.description}>
        지금까지 {sharedPeopleCount}명과 {sharedDiaryCount}개의 일기를 공유했어요
      </Typography>
    </section>
  );
};

const BoardListSection = () => {
  const { data: boardList, isPending, isError, isSuccess } = useBoardList();

  // TODO: Suspense, ErrorBoundary로 UI 분리하기
  // or React Router DOM의 loader 이용?
  if (isPending || !isSuccess) {
    return '불러오는 중입니다...';
  }

  if (isError) {
    return 'Ooppsss... 일기장 목록을 불러오는데 오류가 났어요';
  }

  const boardListElements = boardList.map((board) => <BoardItem key={`board-${board.id}`} {...board} />);

  return (
    <section className={styles.boardListSection}>
      {boardListElements}
      <AddBoardItemButton />
    </section>
  );
};
