export function getUrl() {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000';
  // Make sure to include https:/// when not in localhost
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include the trailing slash
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
}
