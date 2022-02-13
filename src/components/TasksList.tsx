interface TasksListProps {
  allTasks: { id?: number; title?: string; description?: string }[];
  handleDelete: (taskIdToRemove: number) => void;
}

export function TasksList({ allTasks, handleDelete }: TasksListProps) {
  return (
    <ul>
      {allTasks.map(({ title, description, id }) => (
        <li key={id}>
          <div>
            <h2>{title}</h2>
            <button onClick={() => handleDelete(id!)}>X</button>
          </div>
          {!description ? null : <p>{description}</p>}
        </li>
      ))}
    </ul>
  );
}
