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
import { useNavigate, useSearchParams } from "react-router-dom";


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
  const [editingTodoText, setEditingTodoText] = useState("");
  const [checkedStatus, setCheckedStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate=useNavigate("")

  useEffect(()=>{
    if(searchParams){
      if(!searchParams.get("search")){
        navigate("?search=")
      }
      else{
        setSearchTerm(searchParams.get("search"))
      }
    }
  }, [searchParams])

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      navigate(`?search=${searchTerm}&sort=${sortOrder}`)
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm,sortOrder]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let response;
        if (debouncedSearchTerm === "") {
          // Fetch all tasks
          response = await axios.get(
            `http://localhost:8000/users/1/tasks/?sort=${sortOrder}`
          );
        } else {
          // Fetch filtered tasks
          response = await axios.get(
            `http://localhost:8000/users/1/tasks/?search=${debouncedSearchTerm}&sort=${sortOrder}`
          );
        }

        setTodos(response.data);
        const initialCheckedStatus = {};
        response.data.forEach((todo) => {
          initialCheckedStatus[todo.id] = todo.is_completed;
        });
        setCheckedStatus(initialCheckedStatus);
      } catch (error) {
        console.error("There was an error fetching the tasks!", error);
      }
    };

    fetchTodos();
  }, [debouncedSearchTerm, sortOrder]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      axios
        .post(
          `http://localhost:8000/tasks/`, {
            title: newTodo,
            user_id: 1,
            is_completed: false,
          }
        )
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo("");
          setCheckedStatus((prev) => ({ ...prev, [response.data.id]: false }));
        })
        .catch((error) => {
          console.error("There was an error creating the task!", error);
        });
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        const { [id]: _, ...remaining } = checkedStatus;
        setCheckedStatus(remaining);
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

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
        setEditingTodoId(null);
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleClickRedirect=(id)=>{
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
          backgroundImage: "linear-gradient(#94FFD8,#2ab1e0,#348beb)",
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

          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            label="Search Todos"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: "20px" }}
          />

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

          {/* Sort Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => handleSortChange("asc")}
              color={sortOrder === "asc" ? "primary" : "default"}
              style={{
                borderColor: sortOrder === "asc" ? "#6200ea" : "#ccc",
                color: sortOrder === "asc" ? "#6200ea" : "#000",
              }}
            >
              Sort Ascending
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSortChange("desc")}
              color={sortOrder === "desc" ? "primary" : "default"}
              style={{
                borderColor: sortOrder === "desc" ? "#6200ea" : "#ccc",
                color: sortOrder === "desc" ? "#6200ea" : "#000",
              }}
            >
              Sort Descending
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
                    : "none",
                }}
              >
                <Checkbox
                  checked={checkedStatus[todo.id] || false}
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
                    disabled={checkedStatus[todo.id]}
                  />
                ) : (
                  <ListItemText
                    primary={todo.title}
                    onClick={()=>handleClickRedirect(todo.id)}
                    sx={{ cursor: "pointer" }}
                  />
                )}

                <div>
                  {editingTodoId === todo.id ? (
                    <IconButton
                      onClick={() => saveTodo(todo.id)}
                      color="primary"
                      aria-label="save"
                    >
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setEditingTodoId(todo.id);
                        setEditingTodoText(todo.title);
                      }}
                      color="primary"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => deleteTodo(todo.id)}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
