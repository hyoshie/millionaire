import { Select, SelectProps } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { Category } from '@/types';

type CategorySelectProps = {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const CategorySelect: FC<CategorySelectProps> = ({
  categories,
  selectedCategory: category,
  setSelectedCategory: setCategory,
}) => {
  const handleChange: SelectProps['onChange'] = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Select
      placeholder='Select a category'
      value={category}
      onChange={handleChange}
      marginBottom={4}
    >
      {categories.map((category: Category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
