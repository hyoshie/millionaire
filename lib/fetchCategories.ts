import { supabase } from './supabaseClient';
import { Category } from '@/types';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data: categoriesData, error: error } = await supabase.from('categories').select('*');

  if (error) throw new Error(error.message);

  return categoriesData as Category[];
};
