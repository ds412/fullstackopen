import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
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
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Log in to application
            </Typography>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} size="large">
                    Login
                </Button>
            </Box>
        </Paper>
    )
}

export default LoginForm
