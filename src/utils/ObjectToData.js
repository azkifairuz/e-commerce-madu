export const objectToData = (obj,data) => {
  Object.keys(data.data).forEach((key) => {
    obj[key] = data.data[key];
  });
  return data
};
