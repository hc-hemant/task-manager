import React, { useEffect, useState } from "react";
import "./Board.css";
import List from "../List/List";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import {
  addList,
  addTask,
  deleteList,
  getListItems,
  moveTask,
  removeTask,
} from "../../services/board.service";

const Board = () => {
  const [boardItems, setBoardItems] = useState();
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");

  const clearModal = () => {
    setListName("");
    setShowModal(false);
  };

  useEffect(() => {
    setBoardItems(getListItems());
  }, []);

  const onDropHandler = (fromListId, toListId, cardId) => {
    setBoardItems(moveTask(fromListId, toListId, cardId));
  };

  const onClickHandler = () => {
    setShowModal(true);
  };

  const onSecondaryButtonClickHandler = () => {
    setShowModal(false);
  };

  const onPrimaryButtonClickHandler = () => {
    if (listName) {
      setBoardItems(addList(listName));
      clearModal();
    }
  };

  const onListNameChangeHandler = (event) => {
    setListName(event.target.value);
  };

  const onListDeleteHandler = (id) => {
    setBoardItems(deleteList(id));
  };

  const onTaskAddHandler = ({ title, desc, listId }) => {
    setBoardItems(addTask(listId, { title, desc }));
  };

  const onTaskDeleteHandler = (cardId, listId) => {
    setBoardItems(removeTask(listId, cardId));
  };

  const boardItemElements =
    boardItems &&
    boardItems.map((item) => {
      return (
        <section className="list-items__item" key={item.id}>
          <List
            id={item.id}
            title={item.title}
            items={item.tasks}
            onDrop={onDropHandler}
            onListDelete={onListDeleteHandler}
            onTaskAdd={onTaskAddHandler}
            onTaskDelete={onTaskDeleteHandler}
          ></List>
        </section>
      );
    });

  return (
    <div className="board-container">
      <Modal
        open={showModal}
        title="Add List"
        onPrimaryButtonClick={onPrimaryButtonClickHandler}
        onSecondaryButtonClick={onSecondaryButtonClickHandler}
      >
        <div className="board-container__form">
          <Input
            label="Title"
            value={listName}
            onChange={onListNameChangeHandler}
          ></Input>
        </div>
      </Modal>
      <section className="toolbar">
        <Button label="Add List" onClick={onClickHandler}></Button>
      </section>
      <section className="list-items">{boardItemElements}</section>
    </div>
  );
};

export default Board;
