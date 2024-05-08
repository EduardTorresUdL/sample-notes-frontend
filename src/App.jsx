import Notes from "./components/Notes"
import { useState, useEffect } from "react"
import loginService from './services/login'
import noteService from './services/noteService'
import LoginForm from "./components/LoginForm"

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

  return (
    <div>
      <h1>Notes</h1>

      {user === null ?
        <LoginForm onLogin={handleLogin} /> :
        <div>
          <p>{user.name} logged-in</p>
          <Notes />
        </div>
      }

    </div>
  )
}

export default App
