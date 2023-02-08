import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = () => {
    const context = useContext(NoteContext);
    const {notes} = context;
    return (
        <div>
        <AddNote/>
        <div className="container">
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
        </div>
    )
}
export default Notes;
