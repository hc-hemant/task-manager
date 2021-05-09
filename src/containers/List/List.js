import React, { useCallback, useState } from "react";
import "./List.css";
import { Plus, X } from "react-bootstrap-icons";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";

const List = ({
  id,
  title,
  items,
  onDrop,
  onListDelete,
  onTaskAdd,
  onTaskDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    desc: "",
  });

  const clearForm = () => {
    setFormState({ title: "", desc: "" });
    setShowModal(false);
  };

  const onDropHandler = useCallback(
    (event) => {
      event.preventDefault();
      const { listId: fromList, cardId } = JSON.parse(
        event.dataTransfer.getData("dragData")
      );
      if (fromList !== id) {
        onDrop(fromList, id, cardId);
      }
    },
    [onDrop, id]
  );

  const onDragoverHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDragStartHandler = useCallback(
    (event, cardId) => {
      event.dataTransfer.setData(
        "dragData",
        JSON.stringify({
          cardId: cardId,
          listId: id,
        })
      );
    },
    [id]
  );

  const cardElements = items.map((item) => {
    return (
      <section className="item" key={item.id}>
        <Card
          title={item.title}
          desc={item.desc}
          id={item.id}
          onDragStart={onDragStartHandler}
          onCardDelete={(cardId) => onTaskDelete(cardId, id)}
        ></Card>
      </section>
    );
  });

  const onAddCardHandler = () => {
    setShowModal(true);
  };

  const formStateChangeHandler = (event) => {
    const name = event.target.name;
    const newFormState = {
      ...formState,
      [name]: event.target.value,
    };
    setFormState(newFormState);
  };

  const onSecondaryButtonClickHandler = () => {
    clearForm();
  };

  const onPrimaryButtonClickHandler = () => {
    if (formState && formState.title && formState.desc) {
      onTaskAdd({ ...formState, listId: id });
      clearForm();
    }
  };

  return (
    <div className="list-container">
      <Modal
        open={showModal}
        title="Add Task"
        onPrimaryButtonClick={onPrimaryButtonClickHandler}
        onSecondaryButtonClick={onSecondaryButtonClickHandler}
      >
        <div className="list-container__form">
          <Input
            label="Title"
            value={formState.title}
            name="title"
            onChange={formStateChangeHandler}
          ></Input>
          <Input
            label="Description"
            value={formState.desc}
            name="desc"
            onChange={formStateChangeHandler}
          ></Input>
        </div>
      </Modal>
      <div className="list-container__header">
        <h3>{title}</h3>
        <span
          className="list-container__header__icon"
          onClick={() => onListDelete(id)}
        >
          <X fontSize={28} fontWeight={800} />
        </span>
      </div>
      <div
        className="list-container__body"
        id={id}
        onDrop={onDropHandler}
        onDragOver={onDragoverHandler}
      >
        {cardElements}
      </div>
      <div className="list-container__add" onClick={onAddCardHandler}>
        <Plus fontSize={28} fontWeight={800} />
      </div>
    </div>
  );
};

export default List;
