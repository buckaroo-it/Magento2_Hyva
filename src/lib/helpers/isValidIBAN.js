export const isValidIBAN = (value) => {
  /* eslint-disable no-param-reassign */
  const regex =
    /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/;
  let v = String(value);
  v = v.replace(/^(.{4})(.*)$/, '$2$1');
  v = v.replace(/[A-Z]/g, function (e) {
    return e.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  });
  /* eslint-enable no-param-reassign */
  let sum = 0;
  let ei = 1;
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = v.length - 1; i >= 0; i--) {
    sum += ei * parseInt(v.charAt(i), 10);
    ei = (ei * 10) % 97;
  }
  return sum % 97 === 1 && regex.test(value);
};
