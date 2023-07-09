import './styles.css'
import { TodoForm } from './TodoFrom';
import { TodoList } from './TodoList';
import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title, date) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: title, date: date, done: false, visible: 'block' },
      ]
    })
  }

  function todoDone(id, done) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  let nextweek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  nextweek = `${nextweek.getFullYear()}-${('0' + (nextweek.getMonth() + 1)).slice(-2)}-${('0' + nextweek.getDate()).slice(-2)}`;

  function weeklyTodo() {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.date > nextweek) {
          return { ...todo, visible: 'none'}
        }
        return todo
      })
    })
  }

  function allTodo() {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        return { ...todo, visible: 'block'}
      })
    })
  }

  return (
    <>
      <TodoForm onSubmit={addTodo} />
      <section>
        <h1 className='header'>Todo List</h1>
        <TodoList todos={todos} todoDone={todoDone} deleteTodo={deleteTodo} />
        <button className="btn filter" onClick={() => weeklyTodo()}>This week</button>
      <button className="btn filter right" onClick={() => allTodo()}>All</button>
      </section>
    </>
  )
}