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
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleChange: SelectProps['onChange'] = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Select
      placeholder='Select a category'
      value={selectedCategory}
      onChange={handleChange}
      bg='white'
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
