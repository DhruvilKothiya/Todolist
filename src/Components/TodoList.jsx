import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  createTheme,
  ThemeProvider,
  Paper,
  Typography,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#ff4081",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#333",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});
  const navigate=useNavigate() // Track checked status for each todo

  // Fetch tasks on component load
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/1/tasks/")
      .then((response) => {
        setTodos(response.data);
        const initialCheckedStatus = {};
        response.data.forEach((todo) => {
          initialCheckedStatus[todo.id] = todo.is_completed;
        });
        setCheckedStatus(initialCheckedStatus);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      axios
        .post(
          `http://localhost:8000/tasks/?user_id=${1}&title=${newTodo}&is_completed=false`
        )
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo("");
          setCheckedStatus((prev) => ({ ...prev, [response.data.id]: false })); // Initialize checkbox state
        })
        .catch((error) => {
          console.error("There was an error creating the task!", error);
        });
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        const { [id]: _, ...remaining } = checkedStatus; // Remove the deleted task's checkbox state
        setCheckedStatus(remaining);
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  // Save edited todo
  const saveTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    axios
      .put(
        `http://localhost:8000/tasks/${id}?title=${editingTodoText}&is_completed=${todoToUpdate.is_completed}`,
        null
      )
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, title: editingTodoText } : todo
          )
        );
        setEditingTodoId(null); // Exit edit mode
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    const newCheckedStatus = !checkedStatus[id];
    setCheckedStatus((prev) => ({ ...prev, [id]: newCheckedStatus }));

    axios
      .put(
        `http://localhost:8000/tasks/${id}?title=${
          todos.find((todo) => todo.id === id).title
        }&is_completed=${newCheckedStatus}`
      )
      .then(() => {
        // Optionally update the local state if needed
      })
      .catch((error) => {
        console.error("There was an error updating the task status!", error);
      });
  };

  const handleTitleClick=(id)=>{
    navigate(`/todolist/${id}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(#00ded1,#2ab1e0,#348beb)",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Typography variant="h1" align="center" gutterBottom>
            Todo App
          </Typography>

          {/* Add Todo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Add your new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTodo}
              style={{
                minWidth: "50px",
                padding: "10px",
              }}
            >
              <AddIcon />
            </Button>
          </div>

          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  textDecoration: checkedStatus[todo.id]
                    ? "line-through"
                    : "none", // Strike-through for completed tasks
                }}
              >
                <Checkbox
                  checked={checkedStatus[todo.id] || false} // Set initial checkbox state
                  onChange={() => handleCheckboxChange(todo.id)}
                  inputProps={{ "aria-label": "controlled" }}
                />

                {editingTodoId === todo.id ? (
                  <TextField
                    fullWidth
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                    disabled={checkedStatus[todo.id]} // Disable editing if the checkbox is checked
                  />
                ) : (
                  <ListItemText primary={todo.title} onClick={() => handleTitleClick(todo.id)} sx={{cursor:'pointer'}}/>
                )}

                {editingTodoId === todo.id ? (
                  <IconButton
                    aria-label="save"
                    onClick={() => saveTodo(todo.id)}
                    color="primary"
                    disabled={checkedStatus[todo.id]} // Disable save button if the checkbox is checked
                  >
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="edit"
                    onClick={() => startEditing(todo.id, todo.title)}
                    color="primary"
                    disabled={checkedStatus[todo.id]} // Disable edit button if the checkbox is checked
                  >
                    <EditIcon />
                  </IconButton>
                )}

                <IconButton
                  aria-label="delete"
                  onClick={() => deleteTodo(todo.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
