import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <p></p>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes &nbsp;
                <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })

    const voteForAnecdote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted for: '${anecdote.content}'`, 5))
    }

    return (
        <>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={voteForAnecdote}
                    />
                )}
        </>
    )
}

export default AnecdoteList
