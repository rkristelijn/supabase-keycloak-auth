'use client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { getStuff, getUser, goHome, login, logout } from './actions'

export const Login = () => {
  const [user, setUser] = useState<User | null>(null)
  const [stuff, setStuff] = useState<any[] | null>(null)

  const handleGetUser = async () => {
    const user = await getUser();
    console.log('pages.tsx', 'user', { user }) 
     setUser(user)
  }

  const handleGetStuff = async () => {
    const stuff = await getStuff()
    console.log('pages.tsx', 'stuff', { stuff })
    setStuff(stuff)
  }

  return (
    <div>
      <div>Current User:</div>
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
            handleGetUser()
          }}
        >
          Get User
        </button>
        <button
          onClick={() => {
            handleGetStuff()
          }}
        >
          Get Stuff
        </button>
        <button
          onClick={() => {
            window.location.href = '/'
            // goHome()
          }}
        >
          Home/Refresh
        </button>
      </div>
      <pre style={{ maxWidth: '500px' }}>{JSON.stringify(user, null, 2)}</pre>
      <pre style={{ maxWidth: '500px' }}>{JSON.stringify(stuff, null, 2)}</pre>
    </div>
  )
}
