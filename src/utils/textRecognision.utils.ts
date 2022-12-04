export const convertGooleApiResponseToProducts = (
  response: Array<Array<{ description: string }>>,
) => {
  return response
    .map((data, idx) => {
      const lineArrLenth = data.length;
      const nameSections = data
        .slice(0, lineArrLenth - 3)
        .map(item => item.description)
        .join(' ')
        .slice(0, 20);
      const priceSections = data
        .slice(lineArrLenth - 2)
        .map(item => item.description)
        .join(' ')
        .slice(0, -1)
        .split(' ')
        .filter(item => !!item)
        .map(item => item.replace(',', '.'));

      return {
        index: idx,
        product: nameSections,
        price: priceSections.length === 2 ? priceSections[1] : priceSections[0],
      };
    })
    .filter(item => !!item);
};
