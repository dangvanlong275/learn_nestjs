export const is_string = (value: any): boolean => {
  const type = typeof value;
  if (type === 'string') return true;
  return false;
};

export const pathFile = (path: string): string => {
  return process.env.APP_URL + path;
};

export const removeItemArray = (key: string, array: string[]) => {
  const index = array.indexOf(key, 0);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
