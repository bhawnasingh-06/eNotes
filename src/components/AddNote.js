import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote} = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Added Successfully!","success");
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className="container ">
      <h2>Add a note</h2>
      <form>
      <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}value={note.tag} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title"  onChange={onchange}value={note.title} minLength={5} required/>
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onchange}value={note.description} minLength={5} required/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
};

export default AddNote;
