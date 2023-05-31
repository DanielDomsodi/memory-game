import { forwardRef, useMemo } from 'react';
import {
  BaseComponentTheme,
  BaseSize,
  Color,
  ThemeProp,
} from '../theme/theme.type';
import classNames from 'classnames';

export type ButtonVariant = 'solid' | 'outline';

export type ButtonTheme = BaseComponentTheme &
  Record<ButtonVariant, ThemeProp<Color>> & {
    size: ThemeProp<BaseSize>;
  };

export type ButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'color'
> & {
  variant?: ButtonVariant;
  size?: BaseSize;
  color?: Color;
  isLoading?: boolean;
  loadingText?: string;
  full?: boolean;
};

const themeClasses: ButtonTheme = {
  base: 'inline-flex items-center justify-center rounded-md font-medium border transition disabled:cursor-not-allowed',
  size: {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-6',
  },
  solid: {
    brand:
      'bg-brand-500 hover:enabled:bg-brand-600 active:enabled:bg-brand-700 disabled:bg-brand-500/50 border-transparent text-white',
    gray: 'bg-gray-100 hover:enabled:bg-gray-200 active:enabled:bg-gray-300 disabled:bg-gray-500/50 border-transparent text-gray-900',
  },
  outline: {
    brand:
      'border-brand-500 hover:enabled:bg-brand-50 active:enabled:bg-brand-100 disabled:opacity-50 text-brand-500',
    gray: 'border-gray-500 hover:enabled:bg-gray-50 active:enabled:bg-gray-100 disabled:opacity-50 text-gray-500',
  },
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
      variant = 'solid',
      color = 'brand',
      full = false,
      isLoading,
      loadingText,
      ...rest
    } = props;

    const dynamicClasses = useMemo(() => {
      const sizeClass = themeClasses.size[size];
      const themeClass = themeClasses[variant][color];

      return [sizeClass, themeClass];
    }, [size, variant, color]);

    return (
      <button
        ref={ref}
        className={classNames(themeClasses.base, ...dynamicClasses, {
          'opacity-50': isLoading,
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
