import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Check component displaying a blog renders blog title and author BUT NOT URL and likes', () => {
  const blog = {
    author: 'Javier Coronado',
    title: 'Test Blog',
    url: 'www.test.com',
    likes: 5,
  }

  let container

  container = render(<Blog blog={blog} />).container

  const div = container.querySelector('.blogShowLimited')
  screen.debug(container)

  const titlePresent = div.textContent.includes('Test Blog')
  const authorPresent = div.textContent.includes('Javier Coronado')
  const urlNotPresent = div.textContent.includes('www.test.com')
  const likesNotPresent = div.textContent.includes(5)

  expect(titlePresent).toBe(true)
  expect(authorPresent).toBe(true)
  expect(urlNotPresent).toBe(false)
  expect(likesNotPresent).toBe(false)
})
