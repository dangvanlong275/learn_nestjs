export const isString = (value: any): boolean => {
  const type = typeof value;
  if (type === 'string') return true;
  return false;
};

export const isset = (value: any): boolean => {
  return !(value == null);
};

export const deleteProps = (model: object, keys: string[]): any => {
  for (const key of keys) {
    key in model && delete model[key];
  }
};

export const pathFile = (path: string): string => {
  if (isset(path)) return process.env.APP_URL + path;
  return null;
};

export const removeItemArray = (key: string, array: string[]) => {
  const index = array.indexOf(key, 0);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
