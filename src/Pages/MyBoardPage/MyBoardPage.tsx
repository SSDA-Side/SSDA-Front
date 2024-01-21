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
  return <main className={styles.contaienr}>{/* TODO */}</main>;
};
