import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { Avatar } from '@Components/Common/Avatar';
import { Typography } from '@Components/Common/Typography';
import { useGetMemberList } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { SVGIcon } from '@Icons/SVGIcon';
import { PageLayout } from '@Layouts/PageLayout';
import { ComponentPayload, CreateShareLinkModalProps, ViewMemberProps } from '@Store/ModalStore';
import { Member } from '@Type/Model';
import cn from 'classnames';
import { FallbackProps } from 'react-error-boundary';
import { InviteMemberModal } from '../InviteMemberModal';
import styles from './ViewMemberModal.module.scss';

export const ViewMemberModal = ({ modalId }: { modalId: string }) => {
  const { getModal } = useModal();

  const { payload } = getModal(modalId);
  const { props } = payload as ComponentPayload<ViewMemberProps>;
  const { boardId } = props!;

  return (
    <PageLayout
      header={<></>}
      body={<Body boardId={boardId} modalId={modalId} />}
      footer={<Foot modalId={modalId} />}
    />
  );
};

const Body = ({ boardId, modalId }: { boardId: number; modalId: string }) => {
  return (
    <div className={styles.bodyContainer}>
      <AsyncBoundary ErrorFallback={MemberListErrorUI} SuspenseFallback={<MemberListLoadingUI />}>
        <MemberList boardId={boardId} modalId={modalId} />
      </AsyncBoundary>
    </div>
  );
};

const MemberList = ({ boardId, modalId }: { boardId: number; modalId: string }) => {
  const { data: memberList, isSuccess } = useGetMemberList({ id: boardId });

  if (!isSuccess) {
    return;
  }

  const memberListElement = memberList.map((member) => <MemberItem key={member.id} {...member} />);

  return (
    <>
      <Typography as="body2" className={styles.greyed}>
        총 {memberList.length}명
      </Typography>
      <AddNewMemberButton modalId={modalId} boardId={boardId} />
      {memberListElement}
    </>
  );
};

const MemberListErrorUI = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      불러오는데 에러가 났넹~
      <p>{error.message}</p>
      <button onClick={() => resetErrorBoundary()}>다시 시도</button>
    </div>
  );
};

const MemberListLoadingUI = () => {
  return <div>로딩중~</div>;
};

type MemberItemProp = Member;
const MemberItem = ({ nickname, profileUrl, signedDate }: MemberItemProp) => {
  return (
    <div role="button" className={styles.memberContainer} tabIndex={0}>
      <Avatar profileUrl={profileUrl} />
      <div className={styles.descriptionSection}>
        <Typography as="body2">{nickname}</Typography>
        <Typography as="body3" className={styles.date}>
          참여일 {new Date(signedDate).toLocaleDateString()}
        </Typography>
      </div>
    </div>
  );
};

const AddNewMemberButton = ({ boardId, modalId }: { boardId: number; modalId: string }) => {
  const { openComponentModal, closeModal } = useModal();

  const handleClick = () => {
    closeModal(modalId);
    openComponentModal<CreateShareLinkModalProps>({
      title: '초대하기',
      children: InviteMemberModal,
      props: {
        boardId,
      },
    });
  };

  return (
    <div role="button" className={styles.memberContainer} tabIndex={0} onClick={handleClick}>
      <div className={styles.addButtonIcon}>
        {/* TODO: Plus 아이콘 교체하기 */}
        <div style={{ rotate: '45deg' }}>
          <SVGIcon name="close" className={styles.iconDefault} />
        </div>
      </div>

      <Typography as="body3">멤버 초대하기</Typography>
    </div>
  );
};

const Foot = ({ modalId }: { modalId: string }) => {
  const { openConfirm, closeModal } = useModal();

  const handleClick = () => {
    openConfirm({
      contents: `일기장을 나가면 더 이상 이 일기장을 볼 수 없어요.\n정말 일기장을 나가실건가요?`,
      onYes() {
        // TODO: 일기장 나가기 API 연결
        closeModal(modalId);
      },
    });
  };

  return (
    <div role="button" className={cn(styles.resignButton, styles.greyed)} tabIndex={0} onClick={handleClick}>
      <SVGIcon name="exit" className={styles.smallIcon} />
      <Typography as="body2">일기장 나가기</Typography>
    </div>
  );
};
