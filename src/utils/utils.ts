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
// types of react native required it
export const reactNativePaperRequiredProps = {
  accessibilityLabelledBy: undefined,
  accessibilityLanguage: undefined,
  onPointerEnter: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeave: undefined,
  onPointerLeaveCapture: undefined,
  onPointerMove: undefined,
  onPointerMoveCapture: undefined,
  onPointerCancel: undefined,
  onPointerCancelCapture: undefined,
  onPointerDown: undefined,
  onPointerDownCapture: undefined,
  onPointerUp: undefined,
  onPointerUpCapture: undefined,
  onHoverIn: undefined,
  onHoverOut: undefined,
  delayHoverIn: undefined,
  delayHoverOut: undefined,
};
