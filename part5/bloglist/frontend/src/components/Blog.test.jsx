import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    const updateBlog = vi.fn()
    const removeBlog = vi.fn()

    beforeEach(() => {
        const blog = {
            title: "blog title",
            author: "blog author",
            url: "www.blog.com",
            user: "current user",
            likes: 13
        }
        container = render(
            <Blog key={blog.id} blog={blog}
                update={updateBlog} remove={removeBlog}
                ownsBlog={true}>
            </Blog>
        ).container
    })


    test('at the start title and author are rendered, but url or likes are not', async () => {
        const shown = await container.querySelector('.shown')
        const hidden = await container.querySelector('.hidden')
        expect(shown).not.toHaveStyle('display: none')
        expect(hidden).toHaveStyle('display: none')
    })

    test('url and likes are shown when button controlling shown details is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show details')
        await user.click(button)

        const shown = await container.querySelector('.shown')
        const hidden = await container.querySelector('.hidden')

        expect(shown).toHaveStyle('display: none')
        expect(hidden).not.toHaveStyle('display: none')
    })


    test('if like button is clicked twice, its event handler is called twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
        expect(updateBlog.mock.calls).toHaveLength(2)
    })

})
