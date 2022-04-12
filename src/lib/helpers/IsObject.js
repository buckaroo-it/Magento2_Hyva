const isObject = (maybeObject) =>
  typeof maybeObject === 'object' &&
  !Array.isArray(maybeObject) &&
  maybeObject !== null;

export default isObject;
