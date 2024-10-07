import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
    { id: 3, text: "Practice JavaScript" },
  ]);

  const [newTodo, setNewTodo] = useState(""); // State for new todo input

  // Function to handle adding a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: todos.length + 1, // Increment ID based on current todos
        text: newTodo,
      };
      setTodos([...todos, newTodoItem]); // Update todos state
      setNewTodo(""); // Clear the input field
    }
  };

  // Function to handle deleting a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove todo by ID
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <TextField
          variant="outlined"
          label="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update input value
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add
        </Button>
      </div>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              display: "flex-start",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="delete" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
            <ListItemText primary={todo.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
