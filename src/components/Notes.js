import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title , edescription: currentNote.description,etag: currentNote.tag});
    
  }
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  onChange={onchange} minLength={5} required />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required/>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button"  onClick={handleClick} className="btn btn-dark">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" row my-5 mx-1">
        <h2 >Your Notes</h2>
        <div className="cotainer mx-2">
        {notes.length===0 && 'No notes to display!'}
        </div>

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}

      </div>
    </>
  )

};

export default Notes;
