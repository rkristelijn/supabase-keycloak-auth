'use client'
import { useState } from 'react'
import { getUser, goHome, login, logout } from './actions'

export const Login = () => {
  const [user, setUser] = useState({})

  return (
    <div>
      <div>Current User:</div>
      <pre>{JSON.stringify(user)}</pre>
      <div
        className="button-container"
        style={{ display: 'flex', gap: '10px', justifyContent: 'center', minWidth: '300px' }}
      >
        <button
          onClick={() => {
            login()
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            logout()
          }}
        >
          Logout
        </button>
        <button
          onClick={() => {
            setUser(getUser())
          }}
        >
          Get User
        </button>
        <button
          onClick={() => {
            goHome()
          }}
        >
          Home
        </button>
      </div>
    </div>
  )
}
