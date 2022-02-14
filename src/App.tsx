import React, { useState, useEffect } from 'react';
import { NewTask, TasksList } from './components';

interface newTask {
  id?: number;
  title?: string;
  description?: string;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [newTask, setNewTask] = useState<newTask>({});
  const [allTasks, setAllTasks] = useState<newTask[]>([]);

  useEffect(() => {
    document.title = allTasks.length
      ? `You have ${allTasks.length} tasks`
      : 'To do list';
  }, [allTasks]);

  useEffect(() => {
    const increment = () => setCount((prevCount) => prevCount + 1);
    document.addEventListener('mousedown', increment);
    console.log('event listener added');
    return () => {
      document.removeEventListener('mousedown', increment);
      console.log('event listener removed');
    };
  }, []);

  useEffect(() => {
    alert('component rendered for the first time');
    return () => {
      alert('component is being removed from the DOM');
    };
  }, []);

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

  const handleDelete = (taskIdToRemove: number) =>
    setAllTasks(allTasks.filter((task) => task.id !== taskIdToRemove));

  return (
    <main>
      <h1>Tasks: {count}</h1>
      <NewTask
        newTask={newTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TasksList allTasks={allTasks} handleDelete={handleDelete} />
    </main>
  );
}
