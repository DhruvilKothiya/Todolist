import React from "react";
import { useParams } from "react-router-dom";

export default function TokenPage() {
  const { token } = useParams();

  return (
    <div>
      <h1>Token Page</h1>
      {token ? <h1>Your UUID: {token}</h1> : <h3>No token found</h3>}
    </div>
  );
}
