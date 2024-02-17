import { Typography } from '@Components/Common/Typography';
import { useCreateShareLink } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { SVGIcon } from '@Icons/SVGIcon';
import { ComponentPayload, CreateShareLinkModalProps } from '@Store/ModalStore';
import { useEffect, useState } from 'react';
import styles from './InviteMemberModal.module.scss';

export const InviteMemberModal = ({ modalId }: { modalId: string }) => {
  const [shareLink, setShareLink] = useState('');
  const { mutate, isPending } = useCreateShareLink();

  const { getModal, openAlert, closeModal } = useModal();

  const { payload } = getModal(modalId);
  const { props } = payload as ComponentPayload<CreateShareLinkModalProps>;
  const { boardId } = props!;

  useEffect(() => {
    mutate(
      { boardId },
      {
        onSuccess(data) {
          const { link } = data;
          setShareLink(link);
        },
      },
    );
  }, []);

  const handleURLClick = () => {
    try {
      // iOS는 https 환경에서만 지원합니다
      navigator.clipboard.writeText(shareLink);
      openAlert({ contents: '초대링크가 복사되었습니다.' });
      closeModal(modalId);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleKakaotalkClick = () => {
    const title = `김주현님이 DASSDA 공유일기장에 초대했어요!`;
    const description = `'우리가좍' 일기장에 참여해보세요 :)\n*초대장 유효기간 : ${new Date(
      new Date().setDate(new Date().getDate() + 7),
    ).toLocaleDateString()}`;
    const imageUrl = `https://file.notion.so/f/f/9c43a3ab-d650-4eb3-b5e8-b072870e7202/0e975bbd-f604-4da1-bccd-014604d2b550/invite_image.jpg?id=c640405e-3ed4-47bc-96b3-433abd02aa65&table=block&spaceId=9c43a3ab-d650-4eb3-b5e8-b072870e7202&expirationTimestamp=1707897600000&signature=96MfTP8xwgPmRIvdad18jwEmQVRzGBj4MiwxxyGWJek&downloadName=invite_image.jpg`;
    const url = `https://tesbuild.vercel.app/`;

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
          '우리가좍' 일기장에 멤버를 초대해보세요!
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
