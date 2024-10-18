import React from 'react'
import { useParams } from 'react-router-dom'

export default function Token() {
const {token}=useParams()

  return (
    <div>
      <h1>Token Page</h1>
      <p>Your UUID:{token}</p>
    </div>
  )
}
