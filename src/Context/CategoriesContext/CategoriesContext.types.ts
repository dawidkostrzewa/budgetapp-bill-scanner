export interface CategoriesContextValue {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export interface SingleCategory {
  name: string;
  row: string;
}

export interface Category {
  mainCategory: SingleCategory;
  subCategories: SingleCategory[];
}

export interface CategorySumamry {
  category: SingleCategory;
  summary: string;
}
