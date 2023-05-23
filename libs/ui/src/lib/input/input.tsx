import { forwardRef, useMemo } from 'react';
import {
  BaseSizes,
  BaseThemeProps,
  InputThemeProps,
  InputVariants,
} from '../theme/theme.type';
import classNames from 'classnames';

export type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'size'> &
  BaseThemeProps &
  InputThemeProps & {
    htmlSize?: React.ComponentProps<'input'>['size'];
  };

const baseClasses =
  'w-full rounded-md border ring-blue-100 focus:ring-1 transition';

const inputVariants: InputVariants = {
  outline: 'border-gray-300',
  filled: 'border-transparent bg-gray-100 focus:bg-gray-50 focus:ring-blue-100',
};

const sizeClasses: BaseSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-md',
  lg: 'h-12 px-4 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const {
    variant = 'outline',
    size = 'md',
    className,
    htmlSize,
    ...rest
  } = props;

  const [variantClass, sizeClass] = useMemo(() => {
    return [inputVariants[variant], sizeClasses[size]];
  }, [variant, size]);

  const { style } = rest;
  console.log(style);

  return (
    <input
      ref={ref}
      className={classNames(baseClasses, variantClass, sizeClass, className)}
      size={htmlSize}
      {...rest}
    />
  );
});

export default Input;
