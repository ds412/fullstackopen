import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
    const queryClient = useQueryClient()

    // mutation objects - defined using the relevant server requests as their mutation function
    const newNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (newNote) => {
            const notes = queryClient.getQueryData(['notes'])           // get existing notes
            queryClient.setQueryData(['notes'], notes.concat(newNote))  // add new note locally
        },
    })
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries('notes')      // updates notes by fetching them from server
        },
    })

    // event handlers: perform mutation by calling mutation object's mutate() function
    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        newNoteMutation.mutate({ content, important: true })
    }
    const toggleImportance = (note) => {
        updateNoteMutation.mutate({ ...note, important: !note.important })
    }


    // retrieve data from the server using key 'notes'
    const result = useQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
        refetchOnWindowFocus: false
    })
    console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const notes = result.data

    return (
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map(note =>
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content} <strong> {note.important ? 'important' : ''}</strong>
                </li>
            )}
        </div>
    )
}

export default App
