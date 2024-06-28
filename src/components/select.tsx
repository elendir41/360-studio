'use client';

import ReactSelect from 'react-select';
import { cn } from '~/utils/cn';

const Select = ((props: React.ComponentProps<typeof ReactSelect>) => {
  return (
    <ReactSelect
      {...props}
      classNames={{
        ...props.classNames,
        control: () =>
          cn(
            '!rounded-xl !border-gray-300 !px-2 !py-1 transition',
            'hover:border-gray-400',
            'focus:outline-none',
            'disabled:bg-gray-50 disabled:text-gray-500',
            props.classNames?.control
          ),
      }}
    />
  );
}) as typeof ReactSelect;

export default Select;
