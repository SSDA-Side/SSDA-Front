import { Typography } from '@Components/Common/Typography';
import { useReadNotification } from '@Hooks/NetworkHooks';
import { useModal } from '@Hooks/useModal';
import { SVGIcon } from '@Icons/SVGIcon';
import {
  Notification,
  NotificationComment,
  NotificationLike,
  NotificationNewDiary,
  NotificationNewMember,
  NotificationReply,
} from '@Type/Model';
import { getFormattedDate } from '@Utils/index';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationItem.module.scss';

export const NotificationItem = (notification: Notification) => {
  const { notificationTypeId: notiType } = notification;

  if (notiType === 1) {
    return <NotiItemComment {...notification} />;
  }

  if (notiType === 2) {
    return <NotiItemReply {...notification} />;
  }

  if (notiType === 3) {
    return <NotiItemLike {...notification} />;
  }

  if (notiType === 4) {
    return <NotiItemNewDiary {...notification} />;
  }

  if (notiType === 5) {
    return <NotiItemNewMember {...notification} />;
  }

  throw new Error('never but for NotiItem type-guard');
};

type NotiItemPresenterProp = {
  id: number;
  writerId: number;
  regDate: Date;
  isRead: boolean;
  category: string;
  content: string;
  onClick: () => void;
};

const NotiItemPresenter = ({ id, writerId, category, content, onClick, isRead, regDate }: NotiItemPresenterProp) => {
  const { mutate: readNotification } = useReadNotification();
  const { openAlert } = useModal();

  const handleClick = () => {
    readNotification(
      { id, writerId },
      {
        onError() {
          openAlert({ contents: '알림 읽기에 실패했습니다.' });
        },
      },
    );
    onClick();
  };

  return (
    <li role="button" className={styles.notiItem} onClick={handleClick}>
      <div className={cn(styles.bell, { [styles.active]: !isRead })}>
        <SVGIcon name="bell" className={styles.size24} />
      </div>

      <div className={styles.notiContentSection}>
        <Typography as="h5">{category}</Typography>
        <p className={styles.notiContent}>{content}</p>
        <p className={styles.date}>{getFormattedDate(new Date(regDate))}</p>
      </div>
    </li>
  );
};

const NotiItemComment = ({
  id,
  writerId,
  commentWriterNickname,
  isRead,
  regDate,
  boardId,
  diaryId,
  commentId,
}: NotificationComment) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    id,
    writerId,
    category: '댓글 알림',
    content: `${commentWriterNickname}님이 회원님의 일기에 댓글을 달았습니다.`,
    onClick: () => {
      //https://www.dassda.today/myboard/9/detail?date=2024-02-25&mId=6
      // navigate(`/myboard/${boardId}/detail?date=${regDate.split('T')[0]}&mId=${userData!.id}`);
      navigate(`/myboard/${boardId}/diary/${diaryId}`, { state: { notiCommentId: commentId } });
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemReply = ({ id, writerId, replyWriterNickname, isRead, regDate, boardId, diaryId }: NotificationReply) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    id,
    writerId,
    category: '답글 알림',
    content: `${replyWriterNickname}님이 회원님의 댓글에 답글을 달았습니다.`,
    onClick: () => {
      // navigate(`/myboard/${boardId}/detail?date=${regDate.split('T')[0]}&mId=${userData!.id}`);
      navigate(`/myboard/${boardId}/diary/${diaryId}`, { state: { notiCommentId: commentId } });
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemLike = ({ id, writerId, likeMemberNickname, isRead, regDate, boardId, diaryId }: NotificationLike) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    id,
    writerId,
    category: '좋아요 알림',
    content: `${likeMemberNickname}님이 회원님의 일기에 좋아요을 눌렀습니다.`,
    onClick: () => {
      // navigate(`/myboard/${boardId}/detail?date=${regDate.split('T')[0]}&mId=${userData!.id}`);
      navigate(`/myboard/${boardId}/diary/${diaryId}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemNewDiary = ({ id, writerId, boardTitle, isRead, regDate, boardId, diaryId }: NotificationNewDiary) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    id,
    writerId,
    category: '새글 알림',
    content: `'${boardTitle}' 일기장에 새글이 등록되었습니다. 댓글과 좋아요를 남겨주세요!`,
    onClick: () => {
      // navigate(`/myboard/${boardId}/detail?date=${regDate.split('T')[0]}&mId=${userData!.id}`);
      navigate(`/myboard/${boardId}/diary/${diaryId}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemNewMember = ({ id, writerId, boardTitle, isRead, regDate, boardId }: NotificationNewMember) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    id,
    writerId,
    category: '일기장 신규 멤버 추가 알림',
    content: `'${boardTitle}' 일기장에 새로운 멤버가 참여했습니다.`,
    onClick: () => {
      navigate(`/myboard/${boardId}/calendar`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};
