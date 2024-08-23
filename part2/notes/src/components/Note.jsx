const Note = ({ note, toggleImportance, value, handleUpdatedContent, updateNoteContent }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content}
      <button style={{ marginLeft: '10px' }} onClick={toggleImportance}>{label}</button>
      <form key={note.id} onSubmit={updateNoteContent} >
        <input
          value={value}
          onChange={handleUpdatedContent}
        />
        <button type="submit">modify</button>
      </form>
    </li>
  )
}

export default Note