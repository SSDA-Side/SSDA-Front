import { useState } from 'react';
import styles from './DiaryListPage.module.scss';
import cn from 'classnames';

const memberList = ['나과학', '이종석', '이종석이다', '하이하이', 'say'];

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
