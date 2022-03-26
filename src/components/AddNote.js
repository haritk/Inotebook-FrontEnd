import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({ title:"", description : "", tag: "" })
    const handleClick = (e)=>{
        //page won't get refreshed
        e.preventDefault();
        addNote(note.title, note.description, note.tag );
        setnote({ title:"", description : "", tag: "" })
    }
    const onChange = (e)=>{
        //target ki property name waali field mein e ke target ki value daal do
        setnote({...note,[e.target.name]: e.target.value})
    }
    return (      
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" value = {note.title} name="title" aria-describedby="emailHelp" 
                    onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" value = {note.description} name="description" 
                    onChange={onChange} />
                </div>
                <div className="mb-3 ">
                <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" value = {note.tag} name="tag" 
                    onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 ||note.description.length<5 } type="submit" onClick = {handleClick} className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default AddNote