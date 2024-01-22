/** Style 및 Layout */
import styles from './ContextMenuModal.module.scss';
import { PageLayout } from '@Layouts/PageLayout';

/** Component */
import { IconButton } from '@Components/Common/Button';
import { PageHeader } from '@Components/Common/PageHeader';
import { Typography } from '@Components/Common/Typography';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Type */
import type { IconName } from '@Type/index';

type ContextMenuModalProp = { title: string; onClose: () => void; onSelect: (type: string) => void };
export const ContextMenuModal = (props: ContextMenuModalProp) => {
  return <PageLayout header={<Head {...props} />} body={<Body {...props} />} />;
};

type HeadProp = { title: string; onClose: () => void };
const Head = ({ title, onClose }: HeadProp) => {
  return (
    <PageHeader>
      <PageHeader.Center>
        <Typography as="h2">{title}</Typography>
      </PageHeader.Center>

      <PageHeader.Right>
        <IconButton icon="close" onClick={onClose} />
      </PageHeader.Right>
    </PageHeader>
  );
};

type BodyProp = { onSelect: (type: string) => void };
const Body = ({ onSelect }: BodyProp) => {
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
