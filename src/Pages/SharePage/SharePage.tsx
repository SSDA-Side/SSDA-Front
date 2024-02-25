import { EmotionImage } from '@Assets/EmotionImages';
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { CTAButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';
import { useGetShareLinkMetadata } from '@Hooks/NetworkHooks';
import { FallbackProps } from 'react-error-boundary';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './SharePage.module.scss';

export async function loader({ request }: LoaderFunctionArgs) {
  const hashKey = new URL(request.url).searchParams.get('hash');

  return { hashKey };
}

export const SharePage = () => {
  const { hashKey } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (hashKey === null) {
    return <InvalidView />;
  }

  return (
    <>
      <AsyncBoundary ErrorFallback={ErrorUI} SuspenseFallback={<LoadingUI />}>
        <AwaitedView hashKey={hashKey} />
      </AsyncBoundary>
    </>
  );
};

const LoadingUI = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <div className={styles.content}>
          <EmotionImage type="normal" />
          <Typography as="body1">불러오는 중입니다...</Typography>
        </div>
      </div>
    </div>
  );
};

const ErrorUI = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      초대 정보를 불러오는 도중 오류가 발생했습니다.
      <p>{error.message}</p>
      <button onClick={() => resetErrorBoundary()}>다시 시도</button>
    </div>
  );
};

const InvalidView = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <div className={styles.content}>
          <EmotionImage type="sad" />
          <Typography as="body1">잘못된 접근입니다.</Typography>
          <Typography as="body2">초대 링크를 다시 한번 확인해보세요.</Typography>

          <CTAButton onClick={() => navigate('/login', { replace: true })}>다쓰다 첫화면으로 돌아가기</CTAButton>
        </div>
      </div>
    </div>
  );
};

const AwaitedView = ({ hashKey }: { hashKey: string }) => {
  const { data: shareMeta } = useGetShareLinkMetadata({ hashKey });

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup_board', { state: { boardId: shareMeta.boardId }, replace: true });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <section className={styles.content}>
          <EmotionImage type="fell_in_love" />

          <div className={styles.texts}>
            <Typography as="h2" className={styles.spacing12}>
              {shareMeta.nickname}님이
            </Typography>
            <Typography as="h2">
              <strong>{shareMeta.boardTitle}</strong> 일기장에 초대했어요!
            </Typography>
          </div>

          <Typography as="body2" className={styles.grayed}>
            일기장에 참여해서 일상을 공유해보세요
          </Typography>
        </section>

        <section className={styles.ctaWrapper}>
          <CTAButton onClick={handleSignupClick}>일기장 참여하기</CTAButton>
        </section>
      </div>
    </div>
  );
};
