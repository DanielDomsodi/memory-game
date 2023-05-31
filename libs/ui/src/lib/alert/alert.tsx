import { cloneElement, forwardRef, isValidElement, useMemo } from 'react';
import { BaseComponentTheme, ThemeProp } from '../theme/theme.type';
import classNames from 'classnames';

export type Status = 'error' | 'success' | 'warning' | 'info';

export type AlertProps = React.ComponentPropsWithRef<'div'> & {
  status?: Status;
  alertIcon?: React.ReactElement<SVGSVGElement>;
};

export type AlertTheme = BaseComponentTheme &
  ThemeProp<Status> & {
    icon: BaseComponentTheme & ThemeProp<Status>;
  };

const themeClasses: AlertTheme = {
  base: 'flex items-center gap-2 px-4 py-3 rounded',
  info: 'bg-blue-200',
  warning: 'bg-orange-200',
  error: 'bg-red-200',
  success: 'bg-green-200',
  icon: {
    base: 'text-2xl',
    info: 'text-blue-500',
    warning: 'text-orange-500',
    error: 'text-red-500',
    success: 'text-green-500',
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { children, className, status = 'info', alertIcon, ...rest } = props;

  const dynamicClasses = useMemo(() => {
    return [themeClasses[status]];
  }, [status]);

  const _alertIcon =
    isValidElement(alertIcon) &&
    cloneElement(alertIcon, {
      className: classNames(themeClasses.icon.base, themeClasses.icon[status]),
    });

  return (
    <div
      ref={ref}
      className={classNames(themeClasses.base, ...dynamicClasses, className)}
    >
      {_alertIcon}
      {children}
    </div>
  );
});

export default Alert;
