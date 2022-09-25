import { RECIPE_RESPONSE_MOCK } from './mocks/recipe.mock';

const API_URL = 'https://budget-planning-backend-4wid.vercel.app';

export function generateBody(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

async function callGoogleVisionAsync(
  image: string,
  apiUrl: string,
  mockData: boolean = false,
) {
  if (mockData) {
    return Promise.resolve(RECIPE_RESPONSE_MOCK);
  }
  const body = generateBody(image);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  // const detectedText = result.responses[0].fullTextAnnotation;

  const { textAnnotations } = result.responses[0];

  // const fullX = textAnnotations[0].boundingPoly.vertices[0].x;
  const fullY = textAnnotations[0].boundingPoly.vertices[3].y;

  const maxY = Math.max.apply(
    Math,
    textAnnotations[1].boundingPoly.vertices.map((o: { y: number }) => o.y),
  );
  const minY = Math.min.apply(
    Math,
    textAnnotations[1].boundingPoly.vertices.map((o: { y: number }) => o.y),
  );
  // console.log(minY);
  const lineHeigth = maxY - minY;
  // console.log(lineHeigth);
  const howManyLines = Math.floor(fullY / lineHeigth);
  console.log('howManyLines', howManyLines);

  const textLines: Array<Array<{ description: string }>> = [];
  const textAnnotationsSkipped = textAnnotations.slice(1);

  for (let text in textAnnotationsSkipped) {
    const { vertices } = textAnnotationsSkipped[text].boundingPoly;
    const { description } = textAnnotationsSkipped[text];
    // const x = vertices[0].x;
    const y = vertices[0].y;
    const line = Math.floor(y / lineHeigth);
    const textLine = textLines[line] || [];
    textLine.push({ description });
    textLines[line] = textLine;
  }

  console.log('textLines', textLines);

  return textLines;
}
export default callGoogleVisionAsync;

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  const results = await response.json();
  return results.expenseCategories;
};

// export const CATEGORIES = [
//   {
//     mainCategory: 'Jedzenie',
//     subCategories: [
//       'Dom',
//       'Kawa/Herbata',
//       'Woda (butelkowana)',
//       'Alkohol',
//       'Słodyczne/Przekąski',
//       'Napoje (soczki + pepsi)',
//       'FastFood(pizza, burger, kebab, zamówione)',
//     ],
//   },
//   {
//     mainCategory: 'Mieszkanie / dom',
//     subCategories: [
//       'Czynsz',
//       'Rachunki',
//       'Akcesoria',
//       'Ręczniki papierowe',
//       'Środki do sprzątania (chemia)',
//       'Tabletki do zmywarki',
//       'Proszek/Tabletki do prania',
//     ],
//   },
//   {
//     mainCategory: 'Transport',
//     subCategories: [
//       'Paliwo',
//       'Przeglądy i naprawy auta',
//       'Utrzymanie auta (opony, myjnia, płyn do spryskiwaczy)',
//       'Ubezpieczenie auta',
//       'Bilety MPK',
//       'Bilety PKP, PKS',
//       'Taxi',
//       'Oplaty drogowe (autostrady/parkingi)',
//     ],
//   },
//   {
//     mainCategory: 'Telekomunikacja',
//     subCategories: ['Telefon', 'TV', 'Internet'],
//   },
//   {
//     mainCategory: 'Opieka zdrowotna',
//     subCategories: ['Lekarz', 'Badania', 'Lekarstwa', 'Inne'],
//   },
//   {
//     mainCategory: 'Ubranie',
//     subCategories: [
//       'Bielizna',
//       'Codziennie',
//       'Sportowe',
//       'Buty',
//       'Wyjściowe',
//       'Turystyczne',
//     ],
//   },
//   {
//     mainCategory: 'Higiena',
//     subCategories: [
//       'Chusteczki',
//       'Dezodorant',
//       'Papier toaletowy',
//       'Pasta do zębów',
//       'Perfumy',
//       'Kosmetyki',
//       'Mydło',
//     ],
//   },
//   {
//     mainCategory: 'Dzieci',
//     subCategories: [
//       'Artykuły szkolne',
//       'Dodatkowe zajęcia',
//       'Wpłaty na szkołę itp.',
//       'Zabawki / gry',
//       'Opieka nad dziećmi',
//       'Inne',
//     ],
//   },
//   {
//     mainCategory: 'Rozrywka',
//     subCategories: [
//       'Siłownia / Basen',
//       'Kino / Teatr',
//       'Wyjścia na miasto/impreza',
//       'Czasopisma',
//       'Książki',
//       'Hobby',
//       'Turystyka/Wakacje',
//       'Abonamenty',
//     ],
//   },
//   {
//     mainCategory: 'Inne wydatki',
//     subCategories: [
//       'Prezenty',
//       'Sprzęt (Telefon/Komputer/itp)',
//       'Oprogramowanie',
//       'Edukacja',
//       'Inne',
//     ],
//   },
//   {
//     mainCategory: 'Spłata długów',
//     subCategories: [
//       'Kredyt hipoteczny',
//       'Kredyt konsumpcyjny',
//       'Pożyczka osobista',
//       'Inne',
//     ],
//   },
//   {
//     mainCategory: 'Budowanie oszczędności',
//     subCategories: [
//       'Poduszka finansowa (oszczędnosci)',
//       'Fundusz: wakacje',
//       'Fundusz: Sprzęt elektroniczny',
//       'Fundusz: nadwyżka (dowolne rzeczy)',
//     ],
//   },
//   {
//     mainCategory: 'Inwestycje',
//     subCategories: ['Krypto', 'Fundusze inwestycyjne', 'ETF', 'Euro', 'Dolary'],
//   },
//   {
//     mainCategory: 'INNE 2',
//     subCategories: [],
//   },
//   {
//     mainCategory: 'INNE 3',
//     subCategories: [],
//   },
// ];
