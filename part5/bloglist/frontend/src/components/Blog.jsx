import { useState } from 'react'

const Blog = ({ blog, update, remove, ownsBlog }) => {
    const [visible, setVisible] = useState(false)
    const toggleVisibility = () => { setVisible(!visible) }

    const hide = { display: visible ? 'none' : '' }
    const show = { display: visible ? '' : 'none' }
    const removable = { display: ownsBlog ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }


    const addLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            id: blog.id
        }
        update(updatedBlog)
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        remove(blog)
    }

    return (
        <div style={blogStyle} >
            <div style={hide}>
                <p>
                    {blog.title} {blog.author}
                    <button onClick={toggleVisibility}>show details</button>
                </p>
            </div>
            <div style={show}>
                <p>
                    {blog.title} {blog.author}
                    <button onClick={toggleVisibility}>hide details</button>
                </p>
                <p>{blog.url}</p>
                <p>likes: {blog.likes}
                    <button onClick={addLike}>like</button>
                </p>
                <p>{blog.user.username}</p>
                <button style={removable} onClick={removeBlog}>remove</button>
            </div>
        </div >
    )
}

export default Blog
