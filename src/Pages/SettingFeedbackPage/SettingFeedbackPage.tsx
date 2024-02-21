import { TextArea } from '@Components/Common/TextArea';
import { SVGIcon } from '@Icons/SVGIcon';
import { useState } from 'react';
import styles from './SettingFeedbackPage.module.scss';
import { CTAButton } from '@Components/Common/Button';
import cn from 'classnames';

// TODO: [feat] 의견 보내기 기능 구현
export const SettingFeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.feedbackContainer}>
        <p>개발자에게 소중한 의견을 들려주세요 :)</p>
        <div className={styles.rating}>
          {[...Array(rating)].map((number, i) => (
            <button onClick={() => setRating(i + 1)} key={`rating-star-${i}`}>
              <SVGIcon name="star" className="star-lg" />
            </button>
          ))}
          {[...Array(5 - rating)].map((number, i) => (
            <button onClick={() => setRating(rating + i + 1)} key={`rating-empty-${i}`}>
              <SVGIcon name="empty-star" className="star-lg" />
            </button>
          ))}
        </div>
        <TextArea
          placeholder="DASSDA를 사용하시면서 좋았던 점, 불편하셨던 점 등 소중한 의견을 입력해주세요."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <div
        className={cn(styles.buttonBox, {
          [styles.active]: feedback.length > 0 && rating > 0,
        })}
      >
        <CTAButton
          onClick={() => {
            if (feedback.length > 0 && rating > 0) {
              console.log('의견 보내기');
            }
          }}
        >
          의견 보내기
        </CTAButton>
      </div>
    </div>
  );
};
