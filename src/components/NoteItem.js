import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card text-center my-3">
                <div className="card-header">
                    {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.discription}</p>
                </div>
                <div className="card-footer text-muted">
                    <Link to="/" className="btn btn-primary px-4 mx-2" onClick = {() =>{updateNote(note)}}>Edit</Link>
                    <Link to="/" className="btn btn-primary mx-3" onClick={()=>{deleteNote(note._id)}}>Delete</Link>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
