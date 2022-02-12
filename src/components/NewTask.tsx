interface NewTaskProps {
  newTask: any;
  handleChange: any;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function NewTask({ newTask, handleChange, handleSubmit }: NewTaskProps) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        placeholder='New task'
        value={newTask.title || ''}
        onChange={handleChange}
      />
      {!newTask.title ? null : (
        <>
          <textarea
            name='description'
            placeholder='Details...'
            value={newTask.description || ''}
            onChange={handleChange}
          />
          <button type='submit'>Add Task</button>
        </>
      )}
    </form>
  );
}
