import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { note , updateNote} = props;
    return (
        <div className="col-md-3">
           
            <div className="card text-white bg-dark mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-header">{note.tag}</div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted Successfully","success");}}></i>
                    <i className="fas fa-edit" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>

        </div>
    )
};

export default NoteItem;
