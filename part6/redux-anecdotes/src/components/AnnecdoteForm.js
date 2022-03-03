const AnnecdoteForm = ({ addAnecdote = () => {} }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="annecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnnecdoteForm;
