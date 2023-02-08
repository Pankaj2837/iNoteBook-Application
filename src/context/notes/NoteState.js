import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        },
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        },
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        },
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        },
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        },
        {
          "_id": "63e1034d28fb27ff5bcdd2de",
          "user": "63e10160766ade8523309738",
          "title": "P_Notes",
          "discription": "this is the first line of my notes",
          "tag": "Monday_Routin_Notes",
          "__v": 0
        }
      ]
     const [notes,setNotes] = useState(notesInitial);
     // Add a Notes
     const addNote = (title,discription,tag) =>{
      const note = {
        "_id": "63e1034d28fb27ff5bcdd2de",
        "user": "63e10160766ade8523309738",
        "title": title,
        "discription": discription,
        "tag": tag,
        "__v": 0
      };
      setNotes(notes.concat(note))
     }
     // Delete A Notes
     const deleteNote = (id)=>{
      console.log(id);
      const newNotes = notes.filter((note) =>{return note._id !== id})
      setNotes(newNotes);
     }
     // Edit A Notes
     const editNote = (id,title,discription,tag) =>{

     }
    return (
        <NoteContext.Provider value = {{notes,addNote,editNote, deleteNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;