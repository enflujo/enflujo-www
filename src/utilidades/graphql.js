export const entrada = 'http://159.65.232.239:8055/graphql';

export function peticion(query) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          ${query}
        }`
    })
  };
}
