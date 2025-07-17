import { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Link,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material'

import useBlogMutations from '../useBlogMutations'

const Blog = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const { handleUpdateBlog, handleDeleteBlog, handleCommentBlog } = useBlogMutations()

    const [currUser, blog] = state || []

    if (!blog) return <div>Blog not found</div>

    const [localBlog, setLocalBlog] = useState(blog)
    const [comment, setComment] = useState('')
    const ownsBlog = currUser.username === localBlog.user?.username

    const addLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...localBlog,
            likes: localBlog.likes + 1,
        }
        setLocalBlog(updatedBlog)
        await handleUpdateBlog(updatedBlog)
    }

    const addComment = async (event) => {
        event.preventDefault()
        const updatedComments = [...localBlog.comments, comment]
        setLocalBlog({ ...localBlog, comments: updatedComments })
        setComment('')
        await handleCommentBlog(localBlog, comment)
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        await handleDeleteBlog(localBlog)
        navigate('/', { replace: true })
    }
    return (
        <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {localBlog.title} by {localBlog.author}
                </Typography>

                <Link href={localBlog.url} target="_blank" rel="noopener">
                    {localBlog.url}
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Typography>{localBlog.likes} likes</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={addLike}
                        sx={{ ml: 1 }}>
                        like
                    </Button>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Added by {localBlog.user.name}
                </Typography>

                {ownsBlog && (
                    <Button variant="contained" color="error" onClick={removeBlog} sx={{ mt: 2 }}>
                        Remove
                    </Button>
                )}
            </Paper>

            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>

            <List dense>
                {localBlog.comments.map((comment, index) => (
                    <ListItem key={index} divider>
                        <ListItemText primary={comment} />
                    </ListItem>
                ))}
            </List>

            <Box component="form" onSubmit={addComment} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Add a comment"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained">
                    Post Comment
                </Button>
            </Box>
        </Box>
    )
}

export default Blog
