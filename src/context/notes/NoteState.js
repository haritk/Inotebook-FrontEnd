import { useState } from "react";
import NoteContext from "./NoteContext";
//this is the syntax
const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const host = 'http://localhost:8080/note'

    //fxn to fetch notes
    const fetchNotes = async () => {
        console.log(localStorage.getItem('token'))
        const response = await fetch(`${host}/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);

    }

    const addNote = async (title, description, tag) => {
        console.log("adding a new note");
        const response = await fetch(`${host}/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json.note);
        setNotes(notes.concat(json.note));

    }
    const deleteNote = async (id) => {
        console.log("deleting a  note");
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }

    const editNote = async (id, title, description, tag) => {
        
        console.log("editing a  note");
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);
        
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;