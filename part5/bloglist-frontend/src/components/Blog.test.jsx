import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach } from 'vitest'

describe('<Blog />', () => {
  let container
  const blog = {
    author: 'Javier Coronado',
    title: 'Test Blog',
    url: 'www.test.com',
    likes: 5,
  }
  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('Check component displaying a blog renders blog title and author BUT NOT URL and likes', () => {
    const div = container.querySelector('.blogShowLimited')
    screen.debug(div)

    const titlePresent = div.textContent.includes('Test Blog')
    const authorPresent = div.textContent.includes('Javier Coronado')
    const urlNotPresent = div.textContent.includes('www.test.com')
    const likesNotPresent = div.textContent.includes(5)

    expect(div).not.toHaveStyle('display: none')
    expect(titlePresent).toBe(true)
    expect(authorPresent).toBe(true)
    expect(urlNotPresent).toBe(false)
    expect(likesNotPresent).toBe(false)
  })

  test('Check component displaying a blog renders blog, title, author and likes when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogShowAll')

    const urlPresent = div.textContent.includes('www.test.com')
    const likesPresent = div.textContent.includes(5)

    expect(div).not.toHaveStyle('display: none')
    expect(urlPresent).toBe(true)
    expect(likesPresent).toBe(true)
  })
})
