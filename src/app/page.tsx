'use client'
import Cookies from '@/components/cookies'
import { Login } from '@/app/login/pages'

export default function Home() {
  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Login />
      </div>
      <div style={{ flex: 1 }}>
        <Cookies />
      </div>
    </main>
  )
}
