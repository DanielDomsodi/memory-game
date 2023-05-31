export type ThemeProp<
  Key extends string | number | symbol,
  Value = string
> = Record<Key, Value>;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Sizes = ThemeProp<Size>;

export type BaseSize = Exclude<Size, 'xs' | 'xl'>;

export type Color = 'brand' | 'gray';

export type ButtonVariant = 'solid' | 'outline';

export type BaseComponentTheme = {
  base: string;
};
