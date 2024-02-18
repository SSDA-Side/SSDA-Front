/** Asset */
import icons from './sprites.svg';

/** Type */
import type { SVGAttributes } from 'react';
import type { IconName } from '@Type/index';

/** Util */
import cn from 'classnames';

type SVGIconProp = {
  name: IconName;
  size?: number;
  color?: string;
} & SVGAttributes<SVGElement>;

export const SVGIcon = ({ name, size = 32, color = 'currentColor', className }: SVGIconProp) => {
  return (
    <svg className={cn('svg-icons', className)} color={color} width={size} height={size}>
      <use href={`${icons}#${name}`} />
    </svg>
  );
};
