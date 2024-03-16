export const extractNumberFromUrl = (url: string) => {
  const matches = url.match(/\/(\d+)$/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
};
