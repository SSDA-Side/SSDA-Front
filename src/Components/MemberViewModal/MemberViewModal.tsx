/** Style 및 Layout */
import { PageLayout } from '@Layouts/PageLayout';
import styles from './MemberViewModal.module.scss';

/** Component */
import { AsyncBoundary } from '@Components/Common/AsyncBoundary';
import { Avatar } from '@Components/Common/Avatar';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Hook */
import { useGetMemberList } from '@Hooks/NetworkHooks';

/** Type */
import { FallbackProps } from 'react-error-boundary';

/** Util */
import cn from 'classnames';
import { Board, Member } from '@Type/Model';

type MemberViewModalProp = { onClose: () => void } & Pick<Board, 'id'>;
export const MemberViewModal = (props: MemberViewModalProp) => {
  return <PageLayout header={<Head {...props} />} body={<Body {...props} />} footer={<Foot {...props} />} />;
};

type HeadProp = { onClose: () => void };
const Head = ({ onClose }: HeadProp) => {
  return (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2">멤버 보기</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={onClose} />
      </PageHeader.Right>
    </PageHeader>
  );
};

type BodyProp = Pick<Board, 'id'>;
const Body = (boardProps: BodyProp) => {
  return (
    <div className={styles.bodyContainer}>
      <AsyncBoundary ErrorFallback={MemberListErrorUI} SuspenseFallback={<MemberListLoadingUI />}>
        <MemberList {...boardProps} />
      </AsyncBoundary>
    </div>
  );
};

type MemberListProp = Pick<Board, 'id'>;
const MemberList = ({ id }: MemberListProp) => {
  const { data: memberList, isSuccess } = useGetMemberList({ id });

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

type FootProp = { onClose: () => void };
const Foot = ({ onClose }: FootProp) => {
  // TODO: 전역 상태 Reducer Action 호출

  const handleClick = () => {
    const wouldResign = confirm(`일기장을 나가면, 더 이상 이 일기장을 볼 수 없어요.\n정말 일기장을 나가실건가요?`);
    console.log({ wouldResign });
    onClose();
  };

  return (
    <div role="button" className={cn(styles.resignButton, styles.greyed)} tabIndex={0} onClick={handleClick}>
      <SVGIcon name="exit" className={styles.smallIcon} />
      <Typography as="body2">일기장 나가기</Typography>
    </div>
  );
};
