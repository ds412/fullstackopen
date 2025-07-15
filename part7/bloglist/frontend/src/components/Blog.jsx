import { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import useBlogMutations from '../useBlogMutations'

const Blog = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const { handleUpdateBlog, handleDeleteBlog } = useBlogMutations()

    const [currUser, blog] = state || []

    if (!blog) return <div>Blog not found</div>

    const [localBlog, setLocalBlog] = useState(blog)
    const ownsBlog = currUser.username === localBlog.user?.username
    const removable = { display: ownsBlog ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const addLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...localBlog,
            likes: localBlog.likes + 1,
        }
        setLocalBlog(updatedBlog)
        handleUpdateBlog(updatedBlog)
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        await handleDeleteBlog(localBlog)
        navigate('/blogs')
    }

    return (
        <div style={blogStyle} className="blog">
            <div>
                <h2>
                    {localBlog.title} by {localBlog.author}&nbsp;
                </h2>
                <a href={localBlog.url}>{localBlog.url}</a>
                <p>
                    {localBlog.likes} likes
                    <button onClick={addLike}>like</button>
                </p>
                <p>added by {localBlog.user.name}</p>
                <button style={removable} onClick={removeBlog}>
                    remove
                </button>
            </div>
        </div>
    )
}

export default Blog
