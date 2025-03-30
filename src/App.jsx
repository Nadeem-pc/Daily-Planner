import { useState } from 'react'
import './index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [data, setData] = useState('')
  const [taskDate, setTaskDate] = useState('')

  const addTask = (e) => {
    e.preventDefault()

    if(tasks.some(task => task.text === data.trim())){
      alert('Task already added')
    }
    else if (data.trim()) {
      const newTask = {
        id: Date.now(),
        text: data,
        date: taskDate ? new Date(taskDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        completed: false,
      }
      setTasks([newTask, ...tasks])
      setData('')
      setTaskDate('')
    }
  }

  const getInput = (e) => {
    setData(e.target.value)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="app-background">
      <div className="app-container">
        <h1 className="app-title">Daily Planner</h1>
        
        <form onSubmit={addTask} className="input-section">
          <input 
            type="text" 
            value={data}
            onChange={getInput}
            placeholder="What needs to be done?"
            className="task-input"
          />
          
          <div className="input-controls">
            <input 
              type="date" 
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="date-input"
            />
            
            <div className="controls-right">
              <button type="submit" className="add-button">
                Add Task
              </button>
            </div>
          </div>
        </form>
        
        {tasks.length === 0 ? (
          <div className="empty-message">No tasks yet. Add one above!</div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
                <div 
                  className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleComplete(task.id)}
                ></div>
                <div className="task-content">
                  <div className="task-text">{task.text}</div>
                  <div className="task-date">{task.date}</div>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="task-action-button delete-button"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App