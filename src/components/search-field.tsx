import * as React from 'react';
import { Icon } from '@iconify/react';
import { InputHTMLAttributes } from 'react';
import debounce from '~/utils/debounce';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchField = (props: Props) => {
  const handleChange = React.useMemo(
    () => debounce((event: React.ChangeEvent<HTMLInputElement>) => props.onChange?.(event), 350),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <label className="relative flex items-center border-b px-4 py-2 ">
      <Icon icon="fa6-solid:magnifying-glass" className="h-4 w-4 flex-shrink-0 text-gray-500" />
      <input
        data-testid="search-field"
        type="text"
        className="block h-full w-full appearance-none border-0 bg-transparent py-2 pl-4 pr-0 caret-black focus:outline-none focus:ring-0 sm:text-lg"
        placeholder="Rechercher par nom"
        {...props}
        onChange={handleChange}
      />
    </label>
  );
};

export default SearchField;
