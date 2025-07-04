import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })
    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        notificationDispatch({ type: 'show', value: `You voted for: '${anecdote.content}'` })
        setTimeout(() => {
            notificationDispatch({ type: 'hide' })
        }, 5000)
    }

    const result = useQuery(
        { queryKey: ['anecdotes'], queryFn: getAnecdotes, refetchOnWindowFocus: false, retry: 1 }
    )

    if (result.isLoading) { return <div>loading data...</div> }
    if (result.isError) { return <div>anecdote service not available due to problems in the server</div> }
    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
