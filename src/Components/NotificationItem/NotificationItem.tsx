import { Typography } from '@Components/Common/Typography';
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
import styles from './NotificationItem.module.scss';
import { useNavigate } from 'react-router-dom';

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
  category: string;
  content: string;
  regDate: Date;
  isRead: boolean;
  onClick: () => void;
};

const NotiItemPresenter = ({ category, content, onClick, isRead, regDate }: NotiItemPresenterProp) => {
  return (
    <li role="button" className={styles.notiItem} onClick={onClick}>
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

const NotiItemComment = ({ commentWriterNickname, isRead, regDate, boardId }: NotificationComment) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    category: '댓글 알림',
    content: `${commentWriterNickname}님이 회원님의 일기에 댓글을 달았습니다.`,
    onClick: () => {
      navigate(`/myboard/${boardId}/${regDate.split('T')[0]}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemReply = ({ replyWriterNickname, isRead, regDate, boardId }: NotificationReply) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    category: '답글 알림',
    content: `${replyWriterNickname}님이 회원님의 일기에 답글을 달았습니다.`,
    onClick: () => {
      navigate(`/myboard/${boardId}/${regDate.split('T')[0]}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemLike = ({ likeMemberNickname, isRead, regDate, boardId }: NotificationLike) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    category: '좋아요 알림',
    content: `${likeMemberNickname}님이 회원님의 일기에 좋아요을 눌렀습니다.`,
    onClick: () => {
      navigate(`/myboard/${boardId}/${regDate.split('T')[0]}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemNewDiary = ({ boardTitle, isRead, regDate, boardId }: NotificationNewDiary) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    category: '새글 알림',
    content: `'${boardTitle}' 일기장에 새글이 등록되었습니다. 댓글과 좋아요를 남겨주세요!`,
    onClick: () => {
      navigate(`/myboard/${boardId}/${regDate.split('T')[0]}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};

const NotiItemNewMember = ({ boardTitle, isRead, regDate, boardId }: NotificationNewMember) => {
  const navigate = useNavigate();

  const presenterProps: NotiItemPresenterProp = {
    category: '일기장 신규 멤버 추가 알림',
    content: `'${boardTitle}' 일기장에 새로운 멤버가 참여했습니다.`,
    onClick: () => {
      navigate(`/myboard/calendar/${boardId}`);
    },
    regDate: new Date(regDate),
    isRead,
  };

  return <NotiItemPresenter {...presenterProps} />;
};
