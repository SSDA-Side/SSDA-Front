import { TextArea } from '@Components/Common/TextArea';
import { SVGIcon } from '@Icons/SVGIcon';
import { useState } from 'react';
import styles from './SettingFeedbackPage.module.scss';
import { CTAButton } from '@Components/Common/Button';
import cn from 'classnames';
import { useCreateQnA } from '@Hooks/NetworkHooks';
import { EmotionImage } from '@Assets/EmotionImages';
import { useNavigate } from 'react-router-dom';

const IsSendSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.successContainer}>
      <div className={styles.isSendPage}>
        <EmotionImage index={1} />
        <h1>전송 완료!</h1>
        <p>의견이 잘 접수되었습니다.</p>
        <p>더 좋은 서비스를 위해 항상 노력하겠습니다!</p>
      </div>
      <div className={cn(styles.buttonBox, styles.active)}>
        <CTAButton onClick={() => navigate('/myboard')}>My 페이지로 이동하기</CTAButton>
      </div>
    </div>
  );
};

export const SettingFeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { mutate: sendFeedbackMutation } = useCreateQnA();
  const [isSend, setIsSend] = useState(false);

  return (
    <div className={styles.container}>
      {isSend ? (
        <IsSendSuccess />
      ) : (
        <>
          <div className={styles.feedbackContainer}>
            <p>개발자에게 소중한 의견을 들려주세요 :)</p>
            <div className={styles.rating}>
              {[...Array(rating)].map((_number, i) => (
                <button onClick={() => setRating(i + 1)} key={`rating-star-${i}`}>
                  <SVGIcon name="star" className="star-lg" />
                </button>
              ))}
              {[...Array(5 - rating)].map((_number, i) => (
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
                  const submitData = {
                    qaContents: feedback,
                    starPoint: rating,
                  };
                  sendFeedbackMutation(submitData, {
                    onSuccess: () => {
                      setIsSend(true);
                    },
                    onError: () => {
                      setIsSend(true);
                    },
                  });
                }
              }}
            >
              의견 보내기
            </CTAButton>
          </div>
        </>
      )}
    </div>
  );
};
