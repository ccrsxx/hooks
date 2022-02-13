import React, { useState } from 'react';
import { NewTask, TasksList } from './components';

interface newTask {
  id?: number;
  title?: string;
  description?: string;
}

// declare new type for allTasks that consist of newTask but it's wrapped in array
type allTasks = Array<newTask>;

export default function App() {
  const [newTask, setNewTask] = useState<newTask>({});
  const [allTasks, setAllTasks] = useState<allTasks>([]);

  const handleChange = ({
    target
  }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target as HTMLInputElement;
    setNewTask((prevNewTask) =>
      Object.assign({}, prevNewTask, { id: Date.now(), [name]: value })
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTask.title) return;
    setAllTasks((prevAllTasks) => [newTask, ...prevAllTasks]);
    setNewTask({});
  };

  const handleDelete = (taskIdToRemove: number) => {
    setAllTasks((prevAllTasks) =>
      prevAllTasks.filter((task) => task.id !== taskIdToRemove)
    );
  };

  return (
    <main>
      <h1>Tasks</h1>
      <NewTask
        newTask={newTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TasksList allTasks={allTasks} handleDelete={handleDelete} />
    </main>
  );
}
