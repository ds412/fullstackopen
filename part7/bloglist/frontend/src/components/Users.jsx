import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'
import { Link } from 'react-router-dom'

import {
    Alert,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'

const Users = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        retry: 1,
        refetchInterval: 300000,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading)
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>Loading page...</Box>

    if (result.isError)
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                User service not available due to problems in the server
            </Alert>
        )

    const users = result.data

    return (
        <Box>
            <Typography variant="h4" component="h2" color="primary" gutterBottom>
                Users
            </Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>User</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>Blogs Created</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .sort((a, b) => b.blogs.length - a.blogs.length)
                            .map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>
                                        <Link
                                            to={`/users/${user.id}`}
                                            state={{ user }}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                fontWeight: '500',
                                            }}>
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{user.blogs.length}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Users
