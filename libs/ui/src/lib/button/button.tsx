import { ButtonHTMLAttributes, forwardRef, useMemo } from 'react';
import { BaseSizes, BaseThemeProps } from '../theme/theme.type';
import classNames from 'classnames';

export type ButtonProps = React.ComponentPropsWithRef<'button'> &
  BaseThemeProps & {
    isLoading?: boolean;
    loadingText?: string;
    full?: boolean;
  };

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium border-none text-white bg-brand-500 hover:enabled:bg-brand-600 active:enabled:bg-brand-700 disabled:bg-brand-500/50 border transition disabled:cursor-not-allowed';

const sizeClasses: BaseSizes = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-6',
};

function Spinner(props: Omit<React.HTMLAttributes<HTMLElement>, 'children'>) {
  const { className, ...rest } = props;

  return (
    <div
      className={classNames(
        'animate-spin-fast inline-block h-4 w-4 rounded-[9999px] border-2 border-b-transparent border-l-transparent border-r-current border-t-current',
        className
      )}
      {...rest}
    ></div>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      className,
      size = 'md',
      full = false,
      isLoading,
      loadingText,
      ...rest
    } = props;

    const [sizeClass] = useMemo(() => {
      const sizeClass = sizeClasses[size];
      return [sizeClass];
    }, [size]);

    return (
      <button
        ref={ref}
        className={classNames(baseClasses, sizeClass, {
          'bg-brand-500/50': isLoading,
          'w-full': full,
        })}
        {...rest}
      >
        {isLoading ? (
          <>
            <Spinner
              className={classNames({
                absolute: !loadingText,
                'me-2': isLoading && loadingText,
              })}
            />
            <span className={classNames({ 'opacity-0': !loadingText })}>
              {loadingText || children}
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
