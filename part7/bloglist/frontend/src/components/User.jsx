import { useParams, useLocation } from 'react-router-dom'
import { Alert, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

const User = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const user = state?.user

    if (!user) {
        return <Alert severity="error">User not found</Alert>
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h4" gutterBottom color="primary">
                {user.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Added blogs:
            </Typography>
            <List>
                {user.blogs.map((blog) => (
                    <ListItem key={blog.id}>
                        <ListItemText
                            primary={blog.title}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default User
