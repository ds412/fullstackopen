import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material'

import { getBlogs } from '../requests'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import useBlogMutations from '../useBlogMutations'

const BlogList = ({ currUser }) => {
    const blogFormRef = useRef()
    const { handleAddBlog } = useBlogMutations(blogFormRef)

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
        retry: 1,
        refetchInterval: 300000,
        refetchOnWindowFocus: false,
    })
    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <div>Blog service not available due to problems in the server</div>
    }
    const blogs = result.data

    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={handleAddBlog} username={currUser.username} />
                </Togglable>
            </Box>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableBody>
                        {blogs
                            .sort((a, b) => b.likes - a.likes)
                            .map((blog) => (
                                <TableRow key={blog.id} hover>
                                    <TableCell>
                                        <Link
                                            to={`/blogs/${blog.id}`}
                                            state={[currUser, blog]}
                                            style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography>
                                                {blog.title} by {blog.author}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default BlogList
