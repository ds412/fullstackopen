import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

// encapsulate multiple tests in describe function
describe('<Togglable />', () => {
    let container

    // before each test: render Togglable component and save container field
    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" >
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    // verift Togglable component renders its child component
    test('renders its children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')    // find the div
        expect(div).toHaveStyle('display: none')            // verifies CSS style is set to display: none
    })

    test('after clicking the button, children are displayed', async () => {
        // start session to interact with button, find button and click it
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    // verify that clicking button twice hides content
    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)                    // first click

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)               // second click

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
