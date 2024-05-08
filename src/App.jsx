import Notes from "./components/Notes"
import { useState, useEffect } from "react"
import loginService from './services/login'
import noteService from './services/noteService'
import LoginForm from "./components/LoginForm"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      // TODO: Error handling
      console.log('Wrong credentials')
    }
  }


  const padding = { padding: 5 }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        {user
          ? <em>{user.username} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/" element={<div><p>Welcome!</p></div>} />
      </Routes>
    </Router>
  )
}

export default App
