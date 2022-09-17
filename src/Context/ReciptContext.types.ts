export interface ReciptContextValue {
  productsWithPrices: Product[];
  setProductsWithPrices: (p: Product[]) => void;
  updateProduct: (p: Product) => void;
}

export interface Product {
  index: number;
  product: string;
  price: string;
  category?: string;
}
