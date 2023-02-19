import { NativeModules } from 'react-native';
import { RECIPE_RESPONSE_MOCK } from './mocks/recipe.mock';
// TODO: type https://github.com/goatandsheep/react-native-dotenv
// @ts-ignore
import { GOOGLE_API_TOKEN } from '@enviroment';

export const AppUrls = {
  dev: {
    apiUrl: 'https://budget-planning-backend-dev.vercel.app',
  },
  production: {
    apiUrl: 'https://budget-planning-backend-4wid.vercel.app',
  },
};

// const env = NativeModules.RNConfig.env as 'dev' | 'production';
const env = 'production';
const API_URL = AppUrls[env].apiUrl;

const GOOGLE_API_URL =
  'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCpE87ez68ePQRmOFwsH6AyhtqqUpUFa9o';

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

async function callGoogleVisionAsync(image: string, mockData: boolean = false) {
  if (mockData) {
    return Promise.resolve(RECIPE_RESPONSE_MOCK);
  }
  const body = generateBody(image);
  const response = await fetch(GOOGLE_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log('response', result);
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
  try {
    const response = await fetch(`${API_URL}/categories`);
    const results = await response.json();
    return results.expenseCategories;
  } catch (e) {
    console.log('error', JSON.stringify(e));
  }
};

// TODO: type
export const confirmRecipe = async (recipe: any) => {
  const response = await fetch(`${API_URL}/budget/recipe`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  const results = await response.json();
  return results;
};
