import { EmotionImage } from '@Assets/EmotionImages';
import { Typography } from '@Components/Common/Typography';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './BoardSignUpPage.module.scss';
import { useSignUpBoard } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';

export const BoardSignUpPage = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return <SignUpHandler boardId={location.state.boardId} />;
};

export const SignUpHandler = ({ boardId }: { boardId: number }) => {
  const navigate = useNavigate();

  const { openAlert } = useModal();
  const { mutate: signUpBoard } = useSignUpBoard();

  useEffect(() => {
    signUpBoard(
      { id: boardId },
      {
        onSuccess: () => {
          navigate(`/myboard/${boardId}/calendar`, { replace: true });
        },
        onError: (error) => {
          if (error.response!.data.message === '이미 참여한 일기장입니다') {
            navigate(`/myboard/${boardId}/calendar`, { replace: true });
          } else {
            openAlert({ contents: '일기장 참여에 실패했습니다.\n다시 시도해주세요.' });
          }
        },
      },
    );
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>Dassda</p>
      </header>

      <div className={styles.body}>
        <EmotionImage type="excited" />

        <Typography as="body1" className={styles.grayed}>
          일기장에 참여중이에요...
        </Typography>
      </div>
    </div>
  );
};
