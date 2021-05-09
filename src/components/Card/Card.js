import React from "react";
import "./Card.css";
import { X } from "react-bootstrap-icons";

const Card = ({ id, title, desc, onDragStart, onCardDelete }) => {
  return (
    <div
      className="card-container"
      draggable="true"
      id={id}
      onDragStart={(event) => onDragStart(event, id)}
    >
      <div className="card-container__header">
        <h4>{title}</h4>
        <span
          className="card-container__header__icon"
          onClick={() => onCardDelete(id)}
        >
          <X fontSize={24} fontWeight={800} />
        </span>
      </div>
      <div className="card-container__body">{desc}</div>
    </div>
  );
};

export default Card;
