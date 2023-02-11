import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) =>{
  const host ="http://localhost:5000";
    const notesInitial = [];
     const [notes,setNotes] = useState(notesInitial);
     //get All existing notes of given id user
     const getNotes = async () =>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-tocken' : localStorage.getItem('tocken')
        }
      });
      const json =  await response.json(); 
      console.log(json)
      setNotes(json)
     }
     // Add a Notes
     const addNote = async (title,discription,tag) =>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-tocken' : localStorage.getItem('tocken')
        },
        body: JSON.stringify({title,discription,tag}) 
      });
      const json =  await response.json(); 
      console.log(json);
      setNotes(notes.concat(json))
     }
     // Delete A Notes
     const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-tocken' : localStorage.getItem('tocken')
          },
        });
        const json =  await response.json(); 
      console.log(id,json);
      const newNotes = notes.filter((note) =>{return note._id !== id})
      setNotes(newNotes);
     }
     // Edit A Notes
     const editNote = async(id,title,discription,tag) =>{
      // API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-tocken' : localStorage.getItem('tocken')
        },
        body: JSON.stringify({title,discription,tag}) 
      });
      const json =  await response.json(); 
      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to edit
      for(let index =0; index<newNotes.length; index++){
        const element = newNotes[index];
        if(element._id === id ){
          newNotes[index].title = title;
          newNotes[index].discription = discription;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
     }
    return (
        <NoteContext.Provider value = {{notes,addNote,editNote, deleteNote,getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;