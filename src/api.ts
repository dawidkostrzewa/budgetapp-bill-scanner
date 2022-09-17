import { RECIPE_RESPONSE_MOCK } from './mocks/recipe.mock';

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

  // if (detectedText.text) {
  //   return detectedText.text.split('\n');
  // }

  // return detectedText
  //   ? detectedText
  //   : { text: "This image doesn't contain any text!" };
}
export default callGoogleVisionAsync;
