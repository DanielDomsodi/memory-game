type ThemeProp<Key extends string | number | symbol, Value = string> = Record<
  Key,
  Value
>;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Sizes = ThemeProp<Size>;

export type BaseSize = Exclude<Size, 'xs' | 'xl'>;

export type BaseSizes = ThemeProp<BaseSize>;

export type BaseThemeProps = {
  size?: BaseSize;
};

export type Color = 'brand' | 'gray';

export type ButtonVariant = 'solid' | 'outline';
export type ButtonVariants = ThemeProp<ButtonVariant>;

export type InputVariant = 'outline' | 'filled';
export type InputVariants = ThemeProp<InputVariant>;

export type ButtonTheme = Record<ButtonVariant, ThemeProp<Color>>;

export type ButtonThemeProps = {
  variant?: ButtonVariant;
  color?: Color;
};

export type InputThemeProps = {
  variant?: InputVariant;
};
