import styles from './DiaryWritePage.module.scss';

import { EmotionImage } from '@Assets/EmotionImages';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';
import { useConfirm } from '@Hooks/useConfirm';
import { PageLayout } from '@Layouts/PageLayout';
import { confirmStateStore } from '@Store/index';
import { useSetRecoilState } from 'recoil';

export const DiaryWritePage = () => {
  return <PageLayout header={<Head />} body={<Body />} footer={<Foot />} />;
};

const Head = () => {
  return (
    <PageHeader>
      <PageHeader.Left>
        <IconButton icon="left" />
      </PageHeader.Left>

      <PageHeader.Center>
        <Typography as="h3">일기 작성</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <button>
          <Typography as="button">작성하기</Typography>
        </button>
      </PageHeader.Right>
    </PageHeader>
  );
};

const Body = () => {
  const { showConfirm } = useConfirm();

  const handleEmotionClick = () => {
    showConfirm('작성 중인 내용을\n저장하지 않고 나가시겠습니까?', {
      onYes() {
        console.log('Yes Clicked');
      },
      onNo() {
        console.log('No Clicked');
      },
    });
  };

  return (
    <main className={styles.container}>
      <section className={styles.emotionSection}>
        <button onClick={handleEmotionClick}>
          {/* TODO: 기분 아이콘 만들기 */}
          <EmotionImage index={1} />
        </button>
      </section>

      <section className={styles.writeContainer}>
        <div>
          <Typography as="body1" className={styles.greyed}>
            2023.12.09
          </Typography>
        </div>

        <div className={styles.writeWrapper}>
          <textarea className={styles.writeTextBox} placeholder="오늘 하루는 어떠셨나요?" maxLength={1000} />
        </div>

        <div className={styles.imageList}>
          <div className={styles.imagePlaceholder}></div>
          <div className={styles.imagePlaceholder}></div>
          <div className={styles.imagePlaceholder}></div>
        </div>
      </section>
    </main>
  );
};

const Foot = () => {
  return (
    // footer tag는 사이트에 대한 부가정보를 담는 시멘틱인데 여기에서 써도 되나?
    <section className={styles.footer}>
      <PageHeader>
        <PageHeader.Left>
          <IconButton icon="image" className={styles.primary} />
          <IconButton icon="sunny" className={styles.greyed} />
          <IconButton icon="clock" className={styles.greyed} />
        </PageHeader.Left>

        <PageHeader.Right>{/* TODO: 예비용, 혹시 나중에 추가될 수도 */}</PageHeader.Right>
      </PageHeader>
    </section>
  );
};
