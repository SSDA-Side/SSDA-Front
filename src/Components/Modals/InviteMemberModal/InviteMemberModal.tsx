import { Typography } from '@Components/Common/Typography';
import { useCreateShareLink } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { SVGIcon } from '@Icons/SVGIcon';
import { ComponentPayload, CreateShareLinkModalProps } from '@Store/ModalStore';
import { useEffect, useState } from 'react';
import styles from './InviteMemberModal.module.scss';
import { useRecoilValue } from 'recoil';
import { UserStore } from '@Store/UserStore';

export const InviteMemberModal = ({ modalId }: { modalId: string }) => {
  const [hashKey, setHashKey] = useState('');
  const { nickname } = useRecoilValue(UserStore);

  const { mutate, isPending } = useCreateShareLink();

  const { getModal, openAlert, closeModal } = useModal();

  const { payload } = getModal(modalId);
  const { props } = payload as ComponentPayload<CreateShareLinkModalProps>;
  const { board } = props!;

  useEffect(() => {
    mutate(
      { boardId: board.id },
      {
        onSuccess(data) {
          const { shareLink: hashKey } = data;
          setHashKey(hashKey);
        },
      },
    );
  }, []);

  const handleURLClick = () => {
    try {
      // iOS는 https 환경에서만 지원합니다
      navigator.clipboard.writeText(`${import.meta.env.VITE_FRONT_BASE_URI}/share?hash=${hashKey}`);
      openAlert({ contents: '초대링크가 복사되었습니다.' });
      closeModal(modalId);
    } catch (e) {
      openAlert({ contents: `예기치 못한 오류가 발생했습니다. 다시 시도해주세요.\n${(e as Error).message}` });
    }
  };

  const handleKakaotalkClick = () => {
    const title = `${nickname}님이 DASSDA 공유일기장에 초대했어요!`;
    const description = `'${board.title}' 일기장에 참여해보세요 :)\n*초대장 유효기간 : ${new Date(
      new Date().setDate(new Date().getDate() + 7),
    ).toLocaleDateString()}`;
    // const imageUrl = `${import.meta.env.VITE_FRONT_BASE_URI}/kakao_share.png`;
    const imageUrl = import.meta.env.DEV
      ? 'https://file.notion.so/f/f/9c43a3ab-d650-4eb3-b5e8-b072870e7202/4fee2299-0ce8-427d-a177-04ad94fc2177/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1_%EA%B3%B5%EC%9C%A0_%EC%82%AC%EC%A7%84.png?id=889280c4-06cf-4ed3-8da3-db0c08185c28&table=block&spaceId=9c43a3ab-d650-4eb3-b5e8-b072870e7202&expirationTimestamp=1708502400000&signature=BrFgGS4ncx4FZEdc7V4bmum8r5s3EM728gA2XOiaiAM&downloadName=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1+%EA%B3%B5%EC%9C%A0+%EC%82%AC%EC%A7%84.png'
      : `${import.meta.env.VITE_FRONT_BASE_URI}/kakao_share.png`;
    const url = `${import.meta.env.VITE_FRONT_BASE_URI}/share?hash=${hashKey}`;

    // @ts-expect-error: Kakao Javascript SDK
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '일기장 참여하기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <p className={styles.mainText}>{`함께 일상을 공유하고 싶은\n소중한 사람이 있나요?`}</p>
        <Typography as="body2" className={styles.grayed}>
          '{board.title}' 일기장에 멤버를 초대해보세요!
        </Typography>
      </div>

      <div className={styles.buttons}>
        <button className={styles.buttonStyle} onClick={handleURLClick} disabled={isPending}>
          <SVGIcon name="link" className={styles.gray700} />
          <span className={styles.gray800}>URL 복사</span>
        </button>

        <div className={styles.delimitor} />

        <button className={styles.buttonStyle} onClick={handleKakaotalkClick} disabled={isPending}>
          <SVGIcon name="kakaotalk" className={styles.gray700} />
          <span className={styles.gray800}>카카오톡</span>
        </button>
      </div>
    </div>
  );
};
