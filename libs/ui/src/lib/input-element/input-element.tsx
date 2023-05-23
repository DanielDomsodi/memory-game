import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';
import { BaseSizes, BaseThemeProps } from '../theme/theme.type';

export type InputElementProps = React.ComponentPropsWithRef<'div'> &
  Pick<CSSProperties, 'pointerEvents'> &
  BaseThemeProps & {
    placement?: 'left' | 'right';
  };

const inputElementSizeClasses: BaseSizes = {
  sm: 'w-8 h-8 text-size-sm',
  md: 'w-10 h-10 text-size-md',
  lg: 'w-12 h-12 text-size-lg',
};

const InputElement = forwardRef<HTMLDivElement, InputElementProps>(
  function InputElement(props, ref) {
    const {
      className,
      children,
      placement = 'left',
      pointerEvents = 'auto',
      size = 'md',
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={classNames(
          'absolute top-0 flex items-center justify-center',
          inputElementSizeClasses[size],
          { 'pointer-events-none': pointerEvents === 'none' },
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export type InputLeftElementProps = Omit<InputElementProps, 'placement'>;

export const InputLeftElement = forwardRef<
  HTMLDivElement,
  InputLeftElementProps
>(function InputLeftElement(props, ref) {
  const { children, className, ...rest } = props;

  return (
    <InputElement
      ref={ref}
      className={classNames('left-0', className)}
      placement="left"
      {...rest}
    >
      {children}
    </InputElement>
  );
});

export type InputRightElementProps = Omit<InputElementProps, 'placement'>;

export const InputRightElement = forwardRef<
  HTMLDivElement,
  InputRightElementProps
>(function InputRightElement(props, ref) {
  const { children, className, ...rest } = props;

  return (
    <InputElement
      ref={ref}
      className={classNames('absolute right-0', className)}
      placement="left"
      {...rest}
    >
      {children}
    </InputElement>
  );
});
