export const extractUserName = (inputStr: string) => {
  const match = inputStr.match(/user\/(.*)/);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
