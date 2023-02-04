import { getCategories } from '@memory-game/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useCategories() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  const { data: categories, isLoading: isCategoriesQueryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await getCategories();
      return data.results;
    },
  });

  return {
    categories,
    isCategoriesQueryLoading,
    selectedCategory,
    setSelectedCategory,
  };
}
