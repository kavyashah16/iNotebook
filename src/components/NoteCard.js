import React ,{ useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Create from "./Create";

const NoteCard = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((notes) => {
        return <NoteItem key ={notes._id}detail={notes}/>
      })}
    </div>
  );
};

export default NoteCard;
