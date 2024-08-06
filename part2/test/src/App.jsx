import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [modifiedNoteContent, setModifiedNoteContent] = useState('')

  const hook = () => {
      console.log('effect')
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }
  
  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const changeShowAllStatus = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
  }

  const updateNoteContent = (event, id) => {
    event.preventDefault()
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, content: modifiedNoteContent }
    console.log("Changed NOTE", changedNote)
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    setModifiedNoteContent('')
  }

  const handleUpdatedContent = (event) => {
    console.log(event.target.value)
    setModifiedNoteContent(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={changeShowAllStatus}>
          Show {showAll ? 'All' : 'Important'} notes
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note 
                                    key={note.id} 
                                    note={note} 
                                    toggleImportance={toggleImportanceOf} 
                                    value={modifiedNoteContent}
                                    handleUpdatedContent={handleUpdatedContent}
                                    updateNoteContent={(event) => updateNoteContent(event, note.id)}
                                 />)}
      </ul>
      <form key='1' onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 