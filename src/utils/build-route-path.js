export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-z]+)/g;

  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9_-]+)"
  );

  console.log(pathWithParams);

  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
