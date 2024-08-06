const Note = ({ note, toggleImportance, modifiedNoteContent, handleUpdatedContent, updateNoteContent }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <form key={note.id} onSubmit={updateNoteContent} >
        <input 
          value={modifiedNoteContent}
          onChange={handleUpdatedContent}
        />
        <button type="submit">modify</button>
      </form>   
    </li>
  )
}
  
export default Note