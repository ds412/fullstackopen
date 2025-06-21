import { useState } from 'react'
import PropTypes from 'prop-types'

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
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <div >
            <h2>create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input type="text" value={title} name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input type="text" value={author} name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input type="text" value={url} name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

export default BlogForm
