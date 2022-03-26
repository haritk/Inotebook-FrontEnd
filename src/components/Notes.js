import React, { useContext, useEffect,useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  useEffect(() => {
    //if user is logged in then show notes
    if(localStorage.getItem('token')){
      fetchNotes();
    }else{
      navigate('/login');
    }
    
  }, []);
  const [show, setShow] = useState(false);
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const onChange = (e) => {
    //target ki property name waali field mein e ke target ki value daal do
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    //page won't get refreshed
    console.log("editing a note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    handleClose();
    
  }
  const updateNote = (currentNote) => {

    handleShow();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  return (
    <>
      <div className="row my-3">


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value = {note.etitle} aria-describedby="emailHelp" 
                onChange={onChange}   />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value = {note.edescription}
                 onChange={onChange}  />
              </div>
              <div className="mb-3 ">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value = {note.etag} 
                onChange={onChange}   />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button  disabled={note.etitle.length<5 ||note.edescription.length<5 } onClick = {handleClick} variant="primary">
              Update Note
            </Button>
          </Modal.Footer>
        </Modal>

        {/* useref is used to assign ref to some variable */}
        <div className='container'>
          {notes.length ===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes