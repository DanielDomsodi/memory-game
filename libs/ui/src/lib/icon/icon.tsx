import classNames from 'classnames';
import { forwardRef } from 'react';

export type IconProps = React.ComponentPropsWithRef<'svg'>;

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  props,
  ref
) {
  const { children } = props;
  return (
    <svg ref={ref} className={classNames('')}>
      {children}
    </svg>
  );
});

export default Icon;
