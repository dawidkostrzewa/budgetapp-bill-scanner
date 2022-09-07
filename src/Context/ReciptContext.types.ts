export interface ReciptContextValue {
  products: string[];
  prices: number[];
  productsWithPrices: Product[];
  setProductsWithPrices: (p: Product[]) => void;
  onUpdatePrices: (prices: number[]) => void;
  onUpdateProducts: (products: string[]) => void;
}

export interface Product {
  product: string;
  price: number;
}
