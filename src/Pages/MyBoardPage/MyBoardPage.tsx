/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MyBoardPage.module.scss';

/** Component */
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

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
