export interface CategoriesContextValue {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export interface Category {
  mainCategory: string;
  subCategories: string[];
}
