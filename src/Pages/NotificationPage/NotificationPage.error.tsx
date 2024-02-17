import { FallbackProps } from 'react-error-boundary';
import { CTAButton } from '@Components/Common/Button';
import { Typography } from '@Components/Common/Typography';
import { SVGIcon } from '@Icons/SVGIcon';
import styles from './NotificationPage.module.scss';

export const PageErrorUI = ({ resetErrorBoundary }: FallbackProps) => (
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
