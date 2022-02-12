import { Component } from 'react';
import { NewTask } from './components';
import { TasksList } from './components';

interface AppStates {
  newTask: any;
  allTasks: any;
}

export default class App extends Component<{}, AppStates> {
  constructor(props: AppStates) {
    super(props);
    this.state = {
      newTask: {},
      allTasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange({ target }: { target: { name: string; value: string } }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      newTask: {
        ...prevState.newTask,
        [name]: value,
        id: Date.now()
      }
    }));
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!this.state.newTask.title) return;
    this.setState((prevState) => ({
      allTasks: [prevState.newTask, ...prevState.allTasks],
      newTask: {}
    }));
  }

  handleDelete(taskIdToRemove: number) {
    this.setState((prevState) => ({
      allTasks: prevState.allTasks.filter(
        (task: any) => task.id !== taskIdToRemove
      )
    }));
  }

  render() {
    console.log(this.state);
    return (
      <main>
        <h1>Tasks</h1>
        <NewTask
          newTask={this.state.newTask}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TasksList
          allTasks={this.state.allTasks}
          handleDelete={this.handleDelete}
        />
      </main>
    );
  }
}
