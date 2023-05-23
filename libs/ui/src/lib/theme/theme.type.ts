type ThemeProp<Key extends string | number | symbol, Value> = Record<
  Key,
  Value
>;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Sizes = ThemeProp<Size, string>;

export type BaseSize = Exclude<Size, 'xs' | 'xl'>;

export type BaseSizes = ThemeProp<BaseSize, string>;

export type BaseThemeProps = {
  size?: BaseSize;
};

export type InputVariant = 'outline' | 'filled';

export type InputVariants = ThemeProp<InputVariant, string>;

export type InputThemeProps = {
  variant?: InputVariant;
};
