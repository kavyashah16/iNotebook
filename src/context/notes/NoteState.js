import React, { useState } from "react";  // Capital 'R' in React
import NoteContext from "./noteContext";

const NoteState = (props) => { 
    const notesInitial = 
        [
            {
              "_id": "67a75680f1afd2217a0a7a1f",
              "user": "67a3710ace2763a695122a68",
              "title": "Reminder",
              "description": "Complete PBC assign",
              "tag": "General",
              "date": "2025-02-08T13:05:04.830Z",
              "__v": 0
            },
            {
              "_id": "67a75688f1afd2217a0a7a21",
              "user": "67a3710ace2763a695122a68",
              "title": "Reminder2",
              "description": "Complete PBC assign",
              "tag": "General",
              "date": "2025-02-08T13:05:12.949Z",
              "__v": 0
            }
          ]
          const [notes, setNotes] = useState(notesInitial);

          //Add a Note
          const addNote = (title, description, tag) =>{
            const note = {              
                "_id": "67a75680f1afd2217a0a7a1f",
                "user": "67a3710ace2763a695122a68",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2025-02-08T13:05:04.830Z",
                "__v": 0
            };
            setNotes(notes.concat(note)); 
          }

          //Delete a Note
          const deleteNote = () =>{

          }

          //Edit a note
          const updateNote = () =>{

          }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
            {props.children} 
        </NoteContext.Provider>
    );
}

export default NoteState;
