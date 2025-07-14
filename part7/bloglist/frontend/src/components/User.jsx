const User = ({ user }) => {
    if (!user) {
        return null
    }
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

export default User
