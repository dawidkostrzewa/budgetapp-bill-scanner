import { CategorySumamry } from '../CategoriesContext/CategoriesContext.types';

export interface ReciptContextValue {
  productsWithPrices: Product[];
  setProductsWithPrices: (p: Product[]) => void;
  updateProduct: (p: Product) => void;
  recipeImage: string | undefined;
  setRecipeImage: (img: string | undefined) => void;
  recipeSummary: CategorySumamry[];
}

export interface Product {
  index: number;
  product: string;
  price: string;
  category?: string;
}
