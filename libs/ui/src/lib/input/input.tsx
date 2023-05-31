import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { BaseSize, BaseComponentTheme, ThemeProp } from '../theme/theme.type';

export type InputVariant = 'outline' | 'filled';

export type InputTheme = BaseComponentTheme &
  ThemeProp<InputVariant> & {
    size: ThemeProp<BaseSize>;
  };

export type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'size'> & {
  size?: BaseSize;
  variant?: InputVariant;
  htmlSize?: React.ComponentProps<'input'>['size'];
};

const themeClasses: InputTheme = {
  base: 'w-full rounded-md border ring-blue-100 focus:ring-1 transition placeholder:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed',
  outline: 'border-gray-300',
  filled: 'border-transparent bg-gray-100 focus:bg-gray-50 focus:ring-blue-100',
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-md',
    lg: 'h-12 px-4 text-lg',
  },
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

  const dynamicClasses = useMemo(() => {
    return [themeClasses[variant], themeClasses.size[size]];
  }, [variant, size]);

  return (
    <input
      ref={ref}
      className={classNames(themeClasses.base, ...dynamicClasses, className)}
      size={htmlSize}
      {...rest}
    />
  );
});

export default Input;
