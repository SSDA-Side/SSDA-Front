/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MyBoardPage.module.scss';

/** Component */
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { AddBoardItemButton, BoardItem } from '@Components/BoardItem';

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
  const heroData = {
    username: '도토리',
    sharedDiaryCount: 13,
    sharedPeopleCount: 3,
  };

  const username = heroData?.username || '-';
  const sharedPeopleCount = heroData?.sharedPeopleCount || '-';
  const sharedDiaryCount = heroData?.sharedDiaryCount || '-';

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
  const boardList = [
    {
      id: 0,
      title: '안녕',
      appearanceId: 0,
      imageId: 1,
      diaryCount: 0,
      peopleCount: 1,
    },
    {
      id: 1,
      title: '일기',
      appearanceId: 1,
      imageId: 2,
      diaryCount: 12,
      peopleCount: 3,
    },
  ];

  const boardListElements = boardList.map((board) => <BoardItem key={`board-${board.id}`} {...board} />);

  return (
    <section className={styles.boardListSection}>
      {boardListElements}
      <AddBoardItemButton />
    </section>
  );
};
