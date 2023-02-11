import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"", etitle: "", ediscription: "", etag: "" })
    useEffect(() => {
        if(localStorage.getItem('tocken')){
            console.log(localStorage.getItem('tocken'))
            getNotes();
        }else{
            navigate('/Login');
        }

        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id, etitle:currentnote.title, ediscription:currentnote.discription, etag:currentnote.tag});
        
    }
    const handleClick = (e) => {
        console.log("Updating Notes", notes)
        editNote(note.id,note.etitle,note.ediscription,note.etag);
        refClose.current.click();
        props.showAlert("Updated successdully","success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <AddNote showAlert = {props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputTitle" className="form-label"><h4>Title of your note</h4></label>
                                    <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="titleHelp" value={note.etitle} onChange={onChange} />
                                    <div id="titleHelp" className="form-text">Make your title as small as possiable.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDescription" className="form-label"><h4>Description of note</h4></label>
                                    <input type="text" className="form-control" id="ediscription" name="ediscription" value={note.ediscription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputTag" className="form-label"><h4>Tag of note</h4></label>
                                    <input type="text" name="etag" className="form-control" id="etag" aria-describedby="tagHelp" value={note.etag} onChange={onChange} />
                                    <div id="tagHelp" className="form-text">Make your tag as small as possiable.</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled = {note.etag.length<=6 || note.etitle.length<=6 || note.ediscription.length<=15} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <div className="row my-3">
                    <h1>Your Notes</h1>
                    <div className="container mx-2">
                    {notes.length===0 && 'No notes to display'}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                    })}
                </div>
            </div>
        </div>
    )
}
export default Notes;
