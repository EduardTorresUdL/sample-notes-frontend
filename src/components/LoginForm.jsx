import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin({ username, password })
    setUsername('')
    setPassword('')
    navigate("/notes")
  }

  return <form onSubmit={onSubmit} >
    <div>
      username
      <input
        type="text" value={username} name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password" value={password} name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form >
}

export default LoginForm