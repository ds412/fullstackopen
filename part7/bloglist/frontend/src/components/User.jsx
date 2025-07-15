import { useParams, useLocation } from 'react-router-dom'

const User = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const user = state?.user

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
