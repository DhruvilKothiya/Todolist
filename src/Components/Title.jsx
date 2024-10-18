import { collapseClasses } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid"; 

export default function Title() {
  const { id} = useParams();
  const [todos, setTodos] = useState(null);
  const location = useLocation();
  // const token =uuidv4()
  const {token} = location.state;

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
      <h2>{location.state?.token}</h2>
      <p>Status: {todos.is_completed ? "Completed" : "Not Completed"}</p> 
    </div>
  );
}
