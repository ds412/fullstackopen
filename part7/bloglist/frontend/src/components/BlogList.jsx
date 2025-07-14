import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../requests'
import Blog from './Blog'

const BlogList = ({ currUser, handleUpdateBlog, handleDeleteBlog }) => {
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
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        update={handleUpdateBlog}
                        remove={handleDeleteBlog}
                        ownsBlog={currUser.username === blog.user.username}
                    />
                ))}
        </>
    )
}

export default BlogList
