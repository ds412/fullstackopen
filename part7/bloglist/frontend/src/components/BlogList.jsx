import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
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

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5,
    }

    return (
        <>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleAddBlog} username={currUser.username} />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <div key={blog.id} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`} state={[currUser, blog]}>
                            {blog.title} by {blog.author}
                        </Link>
                    </div>
                ))}
        </>
    )
}

export default BlogList
