import {
  Button,
  Center,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useGameDispatch } from '../game-context';
import { useCategories } from './hooks/use-categories';
import { CategorySelect } from './components/category-select';

export function StartGame() {
  const dispatch = useGameDispatch();

  const {
    categories,
    isCategoriesQueryLoading,
    selectedCategory,
    setSelectedCategory,
  } = useCategories();

  function handleStartClick() {
    if (!selectedCategory) {
      return;
    }

    dispatch({ type: 'started', selectedCategoryId: selectedCategory });
  }

  return (
    <Center>
      <Stack textAlign="center" spacing="10">
        <Heading
          size="4xl"
          fontWeight="black"
          bgGradient="linear(to-r, cyan.300, pink.400)"
          bgClip="text"
          mb="12"
        >
          Memory Game
        </Heading>
        <Text fontSize="2xl" mb="12">
          Select a category you like and press Start.
        </Text>

        <Skeleton isLoaded={!isCategoriesQueryLoading}>
          <CategorySelect
            options={categories ?? []}
            placeholder="Select category"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSelectedCategory(Number(e.target.value));
            }}
          />
        </Skeleton>

        <Button
          colorScheme="cyan"
          color="white"
          size="lg"
          disabled={!selectedCategory}
          onClick={handleStartClick}
        >
          Start
        </Button>
      </Stack>
    </Center>
  );
}

export default StartGame;
