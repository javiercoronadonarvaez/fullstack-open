import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Check that Blog Form calls event handler with right details when a new blog is created', async () => {
    const createNewBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createNewBlog={createNewBlog} />)

    const titleInput = screen.getByPlaceholderText('Title Input')
    const authorInput = screen.getByPlaceholderText('Author Input')
    const urlInput = screen.getByPlaceholderText('URL Input')
    const createButton = screen.getByText('create')

    screen.debug(titleInput)
    screen.debug(authorInput)
    screen.debug(urlInput)
    screen.debug(createButton)

    await user.type(titleInput, 'Test')
    await user.type(authorInput, 'Javier Coronado')
    await user.type(urlInput, 'www.testing.com')
    await user.click(createButton)

    console.log(createNewBlog.mock.calls)
  })
})
