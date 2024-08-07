const Filter = ({ searchValue, handleSearchValue }) => {
  return (
    <div>
      <p>Find Countries: </p>
      <input 
        value={searchValue} 
        onChange={handleSearchValue}/>
    </div>
  )
}

export default Filter