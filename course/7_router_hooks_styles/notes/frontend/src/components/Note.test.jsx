import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

// verify that the component renders the contents of the note
test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // try to render the note
    render(<Note note={note} />)
    //screen.debug()                          // print the rendered HTML to the console

    // search the element
    const element = screen.getByText('Component testing is done with react-testing-library')
    //screen.debug(element)                   // print the element to the console
    // verify that the element exists
    expect(element).toBeDefined()

    // // try to render the element
    // const { container } = render(<Note note={note} />)
    // // search the element in its container using its CSS class
    // const div = container.querySelector('.note')
    // // verify this worked
    // expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()             // the event handler is a vitest mock function

    // render the note with its associated button
    render(<Note note={note} toggleImportance={mockHandler} />)

    const user = userEvent.setup()         // start session to interact with rendered component
    const button = screen.getByText('make not important')   // find the button
    await user.click(button)                // click it

    expect(mockHandler.mock.calls).toHaveLength(1)  // verify button is called only once
})
