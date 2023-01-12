import { Select, SelectProps } from '@chakra-ui/react';
import { Category } from '@memory-game/api';
import { ChangeEvent, useState } from 'react';

export type CategorySelectProps = {
  options: Category[];
} & SelectProps;

export function CategorySelect(props: CategorySelectProps) {
  const [value, setValue] = useState<string>('');
  const { options, onChange: onChangeProp, ...rest } = props;

  return (
    <Select
      {...rest}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        onChangeProp?.(e);
      }}
    >
      {options.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
}
