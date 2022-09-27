import {
  Category,
  CategorySumamry,
} from '../Context/CategoriesContext/CategoriesContext.types';
import { Product } from '../Context/RecipeContext/ReciptContext.types';

export const resultOfCategories = (
  cat: Category[],
  proucts: Product[],
): CategorySumamry[] => {
  const catSummary = getAllSubCategories(cat)
    .map(c => {
      const productsInCategory = proucts.filter(p => p.category === c.name);
      const sum = productsInCategory.reduce(
        (acc, p) => acc + Number(p.price),
        0,
      );
      return {
        category: c,
        summary: sum.toFixed(2),
      };
    })
    .filter(c => +c.summary > 0);

  return catSummary;
};

export const getAllSubCategories = (cat: Category[]) => {
  const subCategories = cat.map(c => c.subCategories).flat();
  return subCategories;
};
