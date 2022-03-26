import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import Notes from './Notes';
import AddNote from './AddNote';
const Home = () => {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div>
      <h2>add a note</h2>
      <AddNote/>
      <h2>Your Notes</h2>
      <Notes/>
    </div>
  )
}

export default Home