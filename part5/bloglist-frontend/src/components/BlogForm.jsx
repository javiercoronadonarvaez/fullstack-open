const BlogForm = ({
  addNewBlog,
  newTitle,
  onTitleChange,
  newAuthor,
  onAuthorChange,
  newUrl,
  onUrlChange,
}) => (
  <form onSubmit={addNewBlog}>
    <h2>Create New</h2>
    <div>
      Title:
      <input
        type="text"
        name="Title"
        value={newTitle}
        onChange={onTitleChange}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        name="Author"
        value={newAuthor}
        onChange={onAuthorChange}
      />
    </div>
    <div>
      Url:
      <input type="text" name="Url" value={newUrl} onChange={onUrlChange} />
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;
