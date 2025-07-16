import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/todos/").then((res) => {
            setTodos(res.data);
        })
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:8000/api/todos/', { title, completed: false }).then((res) => {
            setTodos([...todos, res.data]);
            setTitle('');
        });
    };

    const toggleComplete = (id, completed) => {
        axios.patch(`http://localhost:8000/api/todos/${id}/`, {
            completed: !completed
        }).then((res) => {
            setTodos(todos.map(todo => todo.id === id ? res.data : todo));
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:8000/api/todos/${id}/`).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <div>
            <h2>Todo App</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleComplete(todo.id, todo.completed)}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none',cursor:"pointer" }}
                        >
                            {todo.title}
                        </span>
                         <button onClick={() => deleteTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;