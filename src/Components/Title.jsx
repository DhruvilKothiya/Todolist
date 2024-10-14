import { collapseClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Title() {
  const { id } = useParams();
  const [todos, setTodos] = useState(null);
  console.log('todos',todos);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/tasks/${id}`)
      .then((response) => {
        console.log('response',response.data)
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todo!", error);
      });
  },[]);

  if (!todos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 >{todos?.title}</h1>   
      <p>Status: {todos.is_completed ? "Completed" : "Not Completed"}</p> 
    </div>
  );
}
