import { Select, SelectProps, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { Category } from '@/types';

type CategorySelectProps = {
  category: string;
  setCategory: (category: string) => void;
};

export const CategorySelect: FC<CategorySelectProps> = ({ category, setCategory }) => {
  const { categories, isLoading, error } = useFetchCategories();

  const handleChange: SelectProps['onChange'] = (e) => {
    setCategory(e.target.value);
  };
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color='red.500'>Failed to load categories.</Text>;
  }

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