/** Style */
import styles from './Button.module.scss';

/** Component */
import { Typography } from '../Typography';

/** Icon */
import { SVGIcon } from '@Icons/SVGIcon';

/** Type */
import type { IconName } from '@Type/index';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonAs = 'default' | 'CTA' | 'iconButton' | 'editButton';

type ButtonProp = PropsWithChildren<
  {
    as: ButtonAs;
    icon?: IconName;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button = ({ as, icon, color, children, ...rest }: ButtonProp) => {
  switch (as) {
    case 'CTA': {
      return (
        <button className={styles.ctaButton} {...rest}>
          <Typography as="button">{children}</Typography>
        </button>
      );
    }

    case 'iconButton': {
      if (icon === undefined) {
        throw new Error('as를 iconButton로 지정시 icon Prop이 필요합니다.');
      }

      return (
        <button className={styles.iconButton} {...rest}>
          <SVGIcon name={icon} color={color} />
        </button>
      );
    }

    case 'editButton': {
      return (
        <button className={styles.editButton} {...rest}>
          <SVGIcon name="edit" size={16} />
        </button>
      );
    }

    default: {
      return <button {...rest}>{children}</button>;
    }
  }
};

type CTAButtonProp = Omit<ButtonProp, 'as'>;
export const CTAButton = ({ children, ...rest }: CTAButtonProp) => {
  return (
    <Button as="CTA" {...rest}>
      {children}
    </Button>
  );
};

type IconButtonProp = { icon: IconName } & Omit<ButtonProp, 'as'>;
export const IconButton = ({ icon, ...rest }: IconButtonProp) => {
  return <Button as="iconButton" icon={icon} {...rest} />;
};

type EditButtonProp = Omit<ButtonProp, 'as'>;
export const EditButton = (props: EditButtonProp) => {
  return <Button as="editButton" {...props} />;
};
