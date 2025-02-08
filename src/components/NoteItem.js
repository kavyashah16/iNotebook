import React from "react";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

const NoteItem = (props) => {
  const { detail } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title ">{detail.title}</h5>
            <div className="ms-auto">
            <MdOutlineDeleteOutline className="icon mx-1" />
            <MdOutlineEdit className="icon mx-2" />
            </div>
          </div>
          <p className="card-text">{detail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
