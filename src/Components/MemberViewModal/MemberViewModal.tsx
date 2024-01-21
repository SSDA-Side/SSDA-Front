/** Style 및 Layout */
import styles from './MemberViewModal.module.scss';
import { PageLayout } from '@Layouts/PageLayout';

/** Component */
import { Avatar } from '@Components/Common/Avatar';
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Hook */
import { useBoardMemberList } from '@Hooks/NetworkHooks';

/** Type */
import type { BoardMember } from '@Type/index';

/** Util */
import cn from 'classnames';

type MemberViewModalProp = { boardId: number; onClose: () => void };
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

type BodyProp = { boardId: number };
const Body = ({ boardId }: BodyProp) => {
  const { data: memberList, isPending, isSuccess, isError } = useBoardMemberList({ boardId });

  // TODO: 상태에 따른 UI 분리하기, suspense, fallback, successed

  // isSuccess is just for type-guard
  if (isPending || !isSuccess) {
    return '불러오는 중입니다 ...';
  }

  if (isError) {
    return '멤버 목록을 불러오는데 실패했어요';
  }

  const memberListElement = memberList.map((member) => <MemberItem key={member.id} {...member} />);

  return (
    <div className={styles.bodyContainer}>
      <Typography as="body2" className={styles.greyed}>
        총 {memberList.length}명
      </Typography>

      <AddNewMemberButton />
      {memberListElement}
    </div>
  );
};

type MemberItemProp = BoardMember;
const MemberItem = ({ id, name, profileUrl, signedDate }: MemberItemProp) => {
  return (
    <div role="button" className={styles.memberContainer} tabIndex={0}>
      <Avatar profileUrl={profileUrl} />
      <div className={styles.descriptionSection}>
        {/* TODO: 수님께 여기에 해당하는 타이포 없다고 말씀 드리기 */}
        <Typography as="body2">{name}</Typography>
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