import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", discription: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.discription, note.tag, note.title);
    setNote({title: "", discription: "", tag: "" });
    props.showAlert("Added successfully","success")
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
            <input type="text" name="title" className="form-control" id="title" aria-describedby="titleHelp" onChange={onChange} value={note.title} required/>
            <div id="titleHelp" className="form-text"><i className={`text-warning bg-light ${note.title.length >5 ? "d-none":""}`}> Make your title has <b>more than 5</b> characters.</i></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label"><h4>Description of note</h4></label>
            <input type="text" className="form-control" id="discription" name="discription" onChange={onChange} value={note.discription} required/>
            <div id="discriptionHelp" className="form-text"><i className={`text-warning bg-light ${note.discription.length >15 ? "d-none":""}`}> Make your description has <b>more than 15</b> characters.</i></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputTag" className="form-label"><h4>Tag of note</h4></label>
            <input type="text" name="tag" className="form-control" id="tag" aria-describedby="tagHelp" onChange={onChange} value={note.tag} required/>
            <div id="tagHelp" className="form-text"><i className={`text-warning bg-light ${note.tag.length >5 ? "d-none":""}`}> Make your tag has <b>more than 5</b> characters.</i></div>
          </div>
          <button disabled={note.tag.length<=5 || note.title.length<=5 || note.discription.length<=15} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
