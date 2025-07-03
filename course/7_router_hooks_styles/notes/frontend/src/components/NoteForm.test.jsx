import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = vi.fn()                          // create note is a vitest mock function
    const user = userEvent.setup()                      // start session to interact with field and button

    render(<NoteForm createNote={createNote} />)

    const input = screen.getByRole('textbox')
    // const input = container.querySelector('#note-input')   // use id instead, requires container!
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')      // put content into form
    await user.click(sendButton)                     // click the send button

    // check that createNote() was called once and has the right parameters
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
