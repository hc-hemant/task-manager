import { getItemByKey, setItemByKey } from "./storage.service";
import uuid from "react-uuid";

let listItems = [];
const LOCAL_STORAGE_KEY = "BOARD";

export const getListItems = () => {
  if (!(listItems && listItems.length)) {
    listItems = getItemByKey(LOCAL_STORAGE_KEY) || [];
  }
  return [...listItems];
};

export const addList = (title) => {
  const list = {
    id: uuid(),
    title,
    tasks: [],
  };
  listItems.push(list);
  setItemByKey(LOCAL_STORAGE_KEY, listItems);
  return listItems;
};

export const deleteList = (id) => {
  const filteredList = listItems.filter((item) => item.id !== id);
  listItems = filteredList;
  setItemByKey(LOCAL_STORAGE_KEY, listItems);
  return [...listItems];
};

export const addTask = (listId, { title, desc }) => {
  const task = {
    id: uuid(),
    title,
    desc,
  };
  for (let item of listItems) {
    if (item.id === listId) {
      item.tasks.push(task);
    }
  }
  setItemByKey(LOCAL_STORAGE_KEY, listItems);
  return [...listItems];
};

export const removeTask = (listId, cardId) => {
  for (let list of listItems) {
    if (list.id === listId) {
      const filteredTasks = list.tasks.filter((task) => task.id !== cardId);
      list.tasks = filteredTasks;
    }
  }
  setItemByKey(LOCAL_STORAGE_KEY, listItems);
  return [...listItems];
};

export const moveTask = (from, to, cardId) => {
  let listItem;
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].id === from) {
      for (let j = 0; j < listItems[i].tasks.length; j++) {
        if (listItems[i].tasks[j].id === cardId) {
          listItem = listItems[i].tasks.splice(j, 1);
        }
      }
    }
  }

  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].id === to) {
      listItems[i].tasks.unshift(listItem[0]);
    }
  }
  setItemByKey(LOCAL_STORAGE_KEY, listItems);
  return [...listItems];
};
