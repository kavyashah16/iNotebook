import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMzcxMGFjZTI3NjNhNjk1MTIyYTY4In0sImlhdCI6MTczODgyNTk4OH0.dtJ4wcVCGB2WbObqxT_iMDSDRmeHPxrgC2yfS0ccNPA",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMzcxMGFjZTI3NjNhNjk1MTIyYTY4In0sImlhdCI6MTczODgyNTk4OH0.dtJ4wcVCGB2WbObqxT_iMDSDRmeHPxrgC2yfS0ccNPA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes([...notes, json]);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authtoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMzcxMGFjZTI3NjNhNjk1MTIyYTY4In0sImlhdCI6MTczODgyNTk4OH0.dtJ4wcVCGB2WbObqxT_iMDSDRmeHPxrgC2yfS0ccNPA",
      },
    });

    // Remove from UI
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const updateNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMzcxMGFjZTI3NjNhNjk1MTIyYTY4In0sImlhdCI6MTczODgyNTk4OH0.dtJ4wcVCGB2WbObqxT_iMDSDRmeHPxrgC2yfS0ccNPA",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Update in UI
    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
