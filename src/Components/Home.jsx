import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

const Home = () => {
  const navigate = useNavigate();

  const handlesubmit = () => {
    // Generate a UUID
    const token = uuidv4();
    console.log(token);

    // Navigate to TokenPage with the UUID as a route parameter
    navigate(`/tokenpage?token=${token}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handlesubmit}>Display</button>
    </div>
  );
};

export default Home;
