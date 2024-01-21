/** Style */
import styles from './Avatar.module.scss';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

type AvatarProp = { profileUrl?: string; noProfile?: boolean };
export const Avatar = ({ profileUrl, noProfile }: AvatarProp) => {
  const isNoProfile = profileUrl === undefined || profileUrl === '' || noProfile === true;

  const avatarImageStyle = isNoProfile
    ? undefined
    : {
        backgroundImage: `url('${profileUrl}')`,
      };

  return (
    <div className={styles.default} style={avatarImageStyle}>
      {isNoProfile && <SVGIcon name="user" className={styles.iconSizeDefault} />}
    </div>
  );
};
