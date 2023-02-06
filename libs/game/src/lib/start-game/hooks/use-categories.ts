import { getCategories } from '@memory-game/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useCategories() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  const { data: categories, isLoading: isCategoriesQueryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    categories,
    isCategoriesQueryLoading,
    selectedCategory,
    setSelectedCategory,
  };
}
