export interface Response<Results> {
  totals: number;
  results: Results;
}

export interface Category extends BaseCategory {
  sub_categories: Category[];
}

export interface BaseCategory {
  id: number;
  name: string[];
  emojis_count: string[];
}

export interface Emoji {
  id: number;
  name: string;
  emoji: string;
  unicode: string;
  version: string;
  category: Pick<Category, 'id' | 'name'>;
  sub_category: Pick<Category, 'id' | 'name'>;
  children: unknown[];
}
