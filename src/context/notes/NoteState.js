import React, { useState } from "react";
import NoteContext from "./noteContext";
import { useCallback } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNote = useCallback(async (id,) => {
    try {
        const token = localStorage.getItem("token"); // Get token dynamically

        if (!token) {
            console.error("No auth token found. Redirecting to login.");
            return;
        }

        const response = await fetch(`${host}/api/notes/allnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": token,  // Send token dynamically
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching notes:", errorData);
            return;
        }

        const json = await response.json();
        console.log("Fetched Notes:", json);

        if (Array.isArray(json)) {
            setNotes(json);
        } else {
            setNotes([]); // Ensure `notes` is always an array
        }
    } catch (error) {
        console.error("Fetching notes failed:", error);
        setNotes([]); // Prevent app crashes
    }
}, [host]);

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
        localStorage.getItem("token"),
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
        authtoken:
        localStorage.getItem("token"),
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
        authtoken:
        localStorage.getItem("token"),
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
