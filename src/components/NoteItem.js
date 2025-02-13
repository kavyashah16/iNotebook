import React, { useContext } from "react";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { detail, updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title ">{detail.title}</h5>
            <div className="ms-auto">
              <MdOutlineDeleteOutline
                className="icon mx-1 delete-icon"
                onClick={() => {
                  deleteNote(detail._id);
                }}
              />
              <MdOutlineEdit
                className="icon mx-2 edit-icon"
                onClick={() => {
                  updateNote(detail);
                }}
              />
            </div>
          </div>
          <p className="card-text">{detail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
