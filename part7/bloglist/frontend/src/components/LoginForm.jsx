import { useState } from 'react'
import { useNotificationDispatch } from '../NotificationContext'
import { useUserDispatch } from '../UserContext'
import loginService from '../services/login'
import { setToken } from '../requests'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const notificationDispatch = useNotificationDispatch()
    const userDispatch = useUserDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setToken(user.token)
            userDispatch({ type: 'LOGIN', payload: user })
            setUsername('')
            setPassword('')
            notificationDispatch(`Welcome ${user.name}`)
        } catch (exception) {
            notificationDispatch('Error: wrong username or password')
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
