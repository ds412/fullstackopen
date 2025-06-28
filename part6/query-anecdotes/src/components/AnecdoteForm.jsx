import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    })

    const creationError = () => {
        notificationDispatch({ type: 'show', value: 'Error: an anecdote must be at least 5 characters long!' })
        setTimeout(() => {
            notificationDispatch({ type: 'hide' })
        }, 5000)
    }

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        newAnecdoteMutation.mutate({ content, votes: 0 }, { onError: creationError })
        notificationDispatch({ type: 'show', value: `You added the anecdote: '${content}'` })
        setTimeout(() => {
            notificationDispatch({ type: 'hide' })
        }, 5000)

    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
