import { SVGIcon } from '@Icons/SVGIcon';
import { IconName } from '@Type/index';
import { Typography } from '@Components/Common/Typography';
import styles from './BoardContextMenu.module.scss';

export const BoardContextMenu = ({ onSelect }: { onSelect: (value: string) => void }) => {
  const contextMenuList = [
    { type: 'edit', name: '일기장 편집' },
    { type: 'trash', name: '일기장 삭제' },
    { type: 'exit', name: '일기장 나가기' },
    { type: 'users', name: '멤버 보기' },
  ];

  const contextMenuListElement = contextMenuList.map((contextMenu) => (
    <li
      key={contextMenu.type}
      role="button"
      className={styles.menuItem}
      onClick={() => onSelect(contextMenu.type)}
      tabIndex={0}
    >
      <SVGIcon name={contextMenu.type as IconName} className={styles.menuIconSize} />
      <Typography as="body1">{contextMenu.name}</Typography>
    </li>
  ));

  return <ul className={styles.menuList}>{contextMenuListElement}</ul>;
};
