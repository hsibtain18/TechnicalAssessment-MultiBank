import { useState } from 'react'
import './App.css'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import Login from './components/Login'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  return (
    <>
      {!token ? (
        <Login onLogin={(t) => setToken(t)} />
      ) : (
        <DashboardLayout />
      )}
    </>
  )
}

export default App