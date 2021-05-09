export const getItemByKey = (storageKey) => {
  return JSON.parse(localStorage.getItem(storageKey));
};

export const setItemByKey = (storageKey, item) => {
  localStorage.setItem(storageKey, JSON.stringify(item));
};
