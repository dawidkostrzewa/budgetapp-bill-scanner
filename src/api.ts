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

async function callGoogleVisionAsync(image: string, apiUrl: string) {
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
  //   console.log(result);
  const detectedText = result.responses[0].fullTextAnnotation;

  if (detectedText.text) {
    return detectedText.text.split('\n');
  }

  return detectedText
    ? detectedText
    : {text: "This image doesn't contain any text!"};
}
export default callGoogleVisionAsync;
