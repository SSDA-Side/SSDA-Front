import { useState } from 'react';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';

const memberList = ['나과학', '이종석', '이종석이다', '하이하이', 'say'];

const diaryDetail = {
  id: 2,
  memberId: 1,
  nickname: '권동휘',
  profileUrl: 'http://k.kakaocdn.net/dn/dEIZcS/btsEkxlmZOg/MwlX9nxvZx3VACHCSyAuV1/img_640x640.jpg',
  emotionId: 2,
  images: [
    {
      id: 2,
      imgUrl: 'http://118.67.143.25:8080/images/item/59075711-d479-4f58-90d0-faff7f3adbd2.jpeg',
    },
  ],
  title: '상남자 준',
  contents: '오늘 카페에서 뻠이 번호를 ...',
  regDate: '2024-02-04T01:24:53',
  selectDate: '2024-02-02T20:15:30',
  likeCount: 0,
  commentCount: 0,
  owned: true,
};

export const DiaryListPage = () => {
  const [selectMember, setSelectMember] = useState<string>(memberList[0]);

  const onClickMember = (member: string) => {
    setSelectMember(member);
  };
  return (
    <div className={styles.container}>
      <div className={styles.memberTab}>
        {memberList.map((member) => (
          <button
            key={member}
            className={cn(styles.member, { [styles.active]: member === selectMember })}
            onClick={() => onClickMember(member)}
          >
            {member}
          </button>
        ))}
      </div>
    </div>
  );
};
