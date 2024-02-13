import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { Avatar } from '@Components/Common/Avatar';
import { Typography } from '@Components/Common/Typography';
import { useGetMemberList } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { SVGIcon } from '@Icons/SVGIcon';
import { PageLayout } from '@Layouts/PageLayout';
import { ComponentPayload, ViewMemberProps } from '@Store/ModalStore';
import { Member } from '@Type/Model';
import cn from 'classnames';
import { FallbackProps } from 'react-error-boundary';
import styles from './ViewMemberModal.module.scss';

export const ViewMemberModal = ({ modalId }: { modalId: string }) => {
  const { getModal } = useModal();

  const { payload } = getModal(modalId);
  const { props } = payload as ComponentPayload<ViewMemberProps>;
  const { boardId } = props!;

  return <PageLayout header={<></>} body={<Body boardId={boardId} />} footer={<Foot modalId={modalId} />} />;
};

const Body = ({ boardId }: { boardId: number }) => {
  return (
    <div className={styles.bodyContainer}>
      <AsyncBoundary ErrorFallback={MemberListErrorUI} SuspenseFallback={<MemberListLoadingUI />}>
        <MemberList boardId={boardId} />
      </AsyncBoundary>
    </div>
  );
};

const MemberList = ({ boardId }: { boardId: number }) => {
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
      <AddNewMemberButton />
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
        {/* TODO: 수님께 여기에 해당하는 타이포 없다고 말씀 드리기 */}
        <Typography as="body2">{nickname}</Typography>
        <Typography as="body3" className={styles.date}>
          참여일 {new Date(signedDate).toLocaleDateString()}
        </Typography>
      </div>
    </div>
  );
};

const AddNewMemberButton = () => {
  return (
    <div role="button" className={styles.memberContainer} tabIndex={0}>
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
