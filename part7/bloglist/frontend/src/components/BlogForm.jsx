import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const BlogForm = ({ createBlog, username }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            user: username,
            likes: 0,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
                Create new blog
            </Typography>
            <Box component="form" onSubmit={addBlog}>
                <TextField
                    label="Title"
                    type="text"
                    value={title}
                    name="Title"
                    id="blogTitle-input"
                    onChange={({ target }) => setTitle(target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Author"
                    type="text"
                    value={author}
                    name="Author"
                    id="blogAuthor-input"
                    onChange={({ target }) => setAuthor(target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="URL"
                    type="text"
                    value={url}
                    name="Url"
                    id="blogUrl-input"
                    onChange={({ target }) => setUrl(target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    create
                </Button>
            </Box>
        </Paper>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

export default BlogForm
