

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskInput: '',
      editIndex: null,
      modificationCounts: {},
    };
  }

  addTask = () => {
    const { taskInput, tasks } = this.state;
    const taskText = taskInput.trim();

    if (taskText !== '') {
      let quantity = 1;
      const matches = taskText.match(/(.+)\s(\d+)$/);

      if (matches) {
        this.setState({
          taskInput: matches[1],
        });
        quantity = parseInt(matches[2], 10);
      }

      this.setState((prevState) => {
        const newTasks = [...prevState.tasks, ...Array(quantity).fill(taskText)];
        const newModificationCounts = { ...prevState.modificationCounts, [taskText]: 0 };

        return {
          tasks: newTasks,
          taskInput: '',
          modificationCounts: newModificationCounts,
        };
      });
    }
  };

  deleteTask = (index) => {
    this.setState((prevState) => {
      const newTasks = prevState.tasks.filter((_, i) => i !== index);
      const newModificationCounts = { ...prevState.modificationCounts };
      delete newModificationCounts[prevState.tasks[index]];
      
      return {
        tasks: newTasks,
        editIndex: null,
        modificationCounts: newModificationCounts,
      };
    });
  };

  editTask = (index) => {
    this.setState({
      editIndex: index,
      taskInput: this.state.tasks[index],
    });
  };

  updateTask = () => {
    const { editIndex, taskInput, tasks, modificationCounts } = this.state;
    if (editIndex !== null) {
      this.setState((prevState) => {
        const newTasks = [...prevState.tasks];
        newTasks[editIndex] = taskInput;
        const newModificationCounts = {
          ...prevState.modificationCounts,
          [taskInput]: (prevState.modificationCounts[taskInput] || 0) + 1,
        };

        return {
          tasks: newTasks,
          taskInput: '',
          editIndex: null,
          modificationCounts: newModificationCounts,
        };
      });
    }
  };

  render() {
    const { tasks, taskInput, editIndex, modificationCounts } = this.state;

    return (
      <div className="todo-container">
        <h1>Day Goals!</h1>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => this.setState({ taskInput: e.target.value })}
          placeholder="Add a task..."
        />
        <button onClick={editIndex !== null ? this.updateTask : this.addTask}>
          Add Todo
        </button>
        <ul className='list-con'>
          {tasks.map((task, index) => (
            <li className='list' key={index}>
            
              {task}{' '}
              <span className="modification-count">Modified {modificationCounts[task] || 0} times</span>
             <div className='btns-con'>
             <span className="edit-icon" onClick={() => this.editTask(index)}>
                📝
              </span>
              <span className="delete-icon" onClick={() => this.deleteTask(index)}>
                ❌
              </span>
             </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
