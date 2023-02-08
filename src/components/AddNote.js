import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", discription: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.discription, note.tag, note.title);
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-3">
        <h1> Add a notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputTitle" className="form-label"><h4>Title of your note</h4></label>
            <input type="text" name="title" className="form-control" id="title" aria-describedby="titleHelp" onChange={onChange} />
            <div id="titleHelp" className="form-text">Make your title as small as possiable.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label"><h4>Description of note</h4></label>
            <input type="text" className="form-control" id="discription" name="discription" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputTag" className="form-label"><h4>Tag of note</h4></label>
            <input type="text" name="tag" className="form-control" id="tag" aria-describedby="tagHelp" onChange={onChange} />
            <div id="tagHelp" className="form-text">Make your tag as small as possiable.</div>
          </div>
          <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
