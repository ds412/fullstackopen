import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'
import { Link } from 'react-router-dom'

const Users = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        retry: 1,
        refetchInterval: 300000,
        refetchOnWindowFocus: false,
    })
    if (result.isLoading) return <div>loading data...</div>
    if (result.isError) return <div>User service not available due to problems in the server</div>

    const users = result.data

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .sort((a, b) => b.blogs.length - a.blogs.length)
                        .map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`} state={{ user }}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
