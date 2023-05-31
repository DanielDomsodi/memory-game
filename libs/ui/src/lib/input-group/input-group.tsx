import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import Input, { InputProps } from '../input/input';
import classNames from 'classnames';
import {
  InputElementProps,
  InputLeftElement,
  InputRightElement,
} from './input-element';
import { BaseComponentTheme, BaseSize, ThemeProp } from '../theme/theme.type';

export type InputGroupProps = React.ComponentPropsWithRef<'div'> & {
  size?: BaseSize;
};

export type InputGroupTheme = BaseComponentTheme & {
  size: ThemeProp<BaseSize>;
};

const themeClasses: InputGroupTheme = {
  base: 'relative',
  size: {
    sm: 'ps-8',
    md: 'ps-10',
    lg: 'ps-12',
  },
};

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const { className, children, size = 'md', ...rest } = props;

    const validChildren = Children.toArray(children).filter((child) =>
      isValidElement(child)
    ) as React.ReactElement[];

    const clones = validChildren.map((child) => {
      if (child.type === Input) {
        return cloneElement<InputProps>(child, {
          size,
          className: themeClasses.size[size],
        });
      }

      if (child.type === InputLeftElement || child.type === InputRightElement) {
        return cloneElement<InputElementProps>(child, { size });
      }

      return child;
    });

    return (
      <div
        ref={ref}
        className={classNames(themeClasses.base, className)}
        {...rest}
      >
        {clones}
      </div>
    );
  }
);

export default InputGroup;
