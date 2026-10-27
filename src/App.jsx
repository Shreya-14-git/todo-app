import { Component } from "react";
import "./App.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

class App extends Component {
  state = {
    text: "",
    tasks: []
  };

  addTask = () => {
    const text = this.state.text.trim();
    if (!text) return;

    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: Date.now(), text, done: false }
      ],
      text: ""
    });
  };

  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    });
  };

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    });
  };

  render() {
    const { text, tasks } = this.state;
    const done = tasks.filter(task => task.done).length;

    return (
      <div className="app">
        <h1>To-Do App</h1>

        <input
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
          onKeyDown={e => e.key === "Enter" && this.addTask()}
          placeholder="Enter a task"
        />

        <button onClick={this.addTask}>Add</button>

        <p>{done} of {tasks.length} tasks done</p>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.toggleTask}
                onDelete={this.deleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;